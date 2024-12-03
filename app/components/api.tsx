import React, { useEffect } from 'react';
import { useState } from 'react';
import handleLogIn from '../admin/adminForm';
import { METHODS } from 'http';
import { json } from 'stream/consumers';

const PortNumber: string = process.env.PORT ?? '3010';
const BASE_URL = process.env.NEXT_PUBLIC_APP 
  ? `http://${process.env.NEXT_PUBLIC_APP}:${PortNumber}` 
  : `http://localhost:${PortNumber}`;
  
console.log("BASE_URL", BASE_URL);

type Ticket = {
  id: number;
  Name: string;
  ContactNumber: string;
  Comment: string;
};

type AssignedTicket = {
  id: number;
  Name: string;
  ContactNumber: string;
  Comment: string;
  AssignedTo: string;
};

// Handle Data Shared function
export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Throw an error if the response status is not okay
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // Parse the response as JSON
};

// Handle Data Shared Function
export const fetchData = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...options
    });
    return await handleResponse(response);
  } catch (error) {
    console.log('Fetch Error ' + error);
  }
};

export const ApiCalls = () => {
  // Fetch to get all tickets
  const [deletedTickets, setDeleteTicket] = useState<number>(0);
  const [openTickets, setOpenTickets] = useState<number>(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [assignedTicket, setAssignedTickets] = useState<AssignedTicket[]>([]);
  const [listDeletedTickets, setDeletedTickets] = useState<Ticket[]>([]);

  const GetTicket = async () => {
    try {
      const data = await fetchData('retrieveTicket', {
        method: 'GET'
      });
      // Check Data Result
      if (data && data.Result) {
        setTickets(data.Result);
        setOpenTickets(data.Result.length);
        return data;
      }
    } catch (error) {
      console.log('Error fetching tickets ' + error);
    }
  };

  const InsertAuditLog = async (username: string, action: string) => {
    const attempt_date = format_attempt_date(new Date());
    try {
      const data = await fetchData(`InsertAuditLog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          attempt_date,
          action
        })
      });
      if (data && data.success) {
        return data;
      }
    } catch (error) {
      console.log('Failed to insert audit log', error);
    }
  };

  const format_attempt_date = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} 
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const InsertTicketToDeleted = async (
    id: number,
    Name: string,
    ContactNumber: string,
    Comment: string
  ) => {
    try {
      const data = await fetchData(`InsertIntoDeletedComments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          Name,
          ContactNumber,
          Comment
        })
      });
      if (data && data.success) {
        return data;
      }
    } catch (error) {
      console.log('Error deleting record: ' + error);
    }
  };

  // Deletes the tickets per id value
  const DeleteTicket = async (id: number) => {
    try {
      const data = await fetchData(`deleteTicket?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (data) {
        setDeleteTicket((prev) => prev + 1);
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.id !== id)
        );
        window.localStorage.setItem(
          'setDeleteTicket',
          deletedTickets.toString()
        );
      }
    } catch (error) {
      console.log('Error deleting record: ' + error);
    }
  };

  const ArchiveTicket = async (
    Name: string,
    ContactNumber: number,
    Comment: string,
    Assignee: string
  ) => {
    try {
      const data = await fetchData(`archiveTicket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name,
          ContactNumber,
          Comment,
          Assignee
        })
      });
      if (data && data.success) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.Name !== Name)
        );
      }
    } catch (error) {
      console.log('Error archiving file ', error);
    }
  };

  const LogInFormAttempt = async (
    username: string,
    password: string,
    lockedAccount: number,
    successFunction: Function,
    failedLogIn: Function,
    handleLockedAccount: Function
  ) => {
    try {
      // Dont try to log in if account is already locked
      if (lockedAccount === 0) {
        const data = await fetchData(
          `loginAdminForm?username=${username}&password=${password}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (data.result) {
          // Constructs new object with Username, Admin ~ removed passwords
          const userData = {
            Username: data.result.username,
            Admin: data.result.admin,
            Lockedout: data.result.locked
          };
          if (
            typeof successFunction === 'function' &&
            userData.Lockedout !== 1
          ) {
            successFunction(userData);
            // Handles if account is locked == 1 ( locked )
          }
          await InsertAuditLog(username, 'Successfull Log In Attempt');
        } else {
          // Handles Invalid Credentials etc
          failedLogIn(username);
          await InsertAuditLog(username, 'Attempted Log In Attempt');
        }
      } else {
        handleLockedAccount();
        await InsertAuditLog(username, 'Handled Locked Account Attempt');
      }
    } catch (error) {
      console.log('Error ' + error);
    }
  };

  const LockAccount = async (username: string) => {
    try {
      const data = await fetchData('lockAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username
        })
      });
      if (data) {
        return data;
      }
    } catch (error: any) {
      console.log('Error Locking Account', error);
    }
  };

  const CheckIfLocked = async (username: string) => {
    try {
      const data = await fetchData(
        `checkLocked?username=${encodeURIComponent(username)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      console.log('Error checking locked account', error);
    }
  };

  const GetDeletedTickets = async () => {
    try {
      const data = await fetchData('retrieveDeletedTickets', {
        method: 'GET'
      });
      // Check Data Result
      if (data && data.results) {
        setDeletedTickets(data.resuls);
        setDeleteTicket(data.results.length);
        return data.results;
      }
    } catch (error) {
      console.log('Error fetching tickets ' + error);
    }
  };

  const RetrieveSetting = async (Code: string) => {
    try {
      const data = await fetchData(`getSettings?Code=${Code}`, {
        method: 'GET'
      });
      // Check Data Result
      if (data && data.results) {
        return data.results;
      }
    } catch (error) {
      console.log('Error Fetching Setting ' + error);
    }
  };

  const GetArchiveTickets = async () => {
    try {
      const data = await fetchData(`getArchiveTicket`, {
        method: 'GET'
      });
      // Check Data Result
      if (data && data.results) {
        return data.results;
      }
    } catch (error) {
      console.log('Error fetching Archived tickets:', error);
    }
  };

  const FetchTradeMark = async () => {
    try {
      const data = await fetchData('getTrademarkName', {
        method: 'GET'
      });
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.log('Error fetching trademark ' + error);
    }
  };

  const FetchBrandName = async () => {
    try {
      const data = await fetchData('selectBrandName', {
        method: 'GET'
      });
      if (data && data.length > 0) {
        return data;
      }
    } catch (error) {
      console.log('Error Fetching BrandName ' + error);
    }
  };

  const InsertAssignee = async (name: string, AssignedTo: string) => {
    try {
      const data = await fetchData('AllocateAssignee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          AssignedTo
        })
      });
      if (data) {
        return data;
      }
    } catch (error: any) {
      console.log('Inserting Assignee Error', error);
    }
  };

  const AssigneeAndContactTicket = async (Name: string) => {
    try {
      const data = await fetchData(`getContactAndAssignee?Name=${Name}`, {
        method: 'GET'
      });
      if (data) {
        setAssignedTickets(data);
        return data;
      }
    } catch (error: any) {
      console.log('Error getting assingee and Contact Tickets', error);
    }
  };

  return {
    CheckIfLocked,
    LockAccount,
    AssigneeAndContactTicket,
    InsertAssignee,
    FetchBrandName,
    FetchTradeMark,
    GetArchiveTickets,
    RetrieveSetting,
    GetTicket,
    DeleteTicket,
    tickets,
    openTickets,
    InsertAuditLog,
    deletedTickets,
    InsertTicketToDeleted,
    GetDeletedTickets,
    listDeletedTickets,
    LogInFormAttempt,
    ArchiveTicket
  };
};
