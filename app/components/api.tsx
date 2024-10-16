import React, { useEffect } from 'react';
import { useState } from 'react';
import handleLogIn from '../admin/adminForm';

const PortNumber: string = process.env.PORT || '3010';
const BASE_URL = `http://localhost:${PortNumber}`;

type Ticket = {
  id: number;
  Name: string;
  ContactNumber: string;
  Comment: string;
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
      if (data && data.success) {
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
    successFunction: Function
  ) => {
    try {
      const data = await fetchData(
        `loginAdminForm?username=${username}&password=${password}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (data.result.length > 0) {
        // Constructs new object with Username, Admin ~ removed password
        const userData = {
          Username: data.result[0].username,
          Admin: data.result[0].admin
        };
        // Checks the param for success, and handle the front end function for success
        if (typeof successFunction === 'function') {
          successFunction(userData);
        }
        await InsertAuditLog(username, 'Successfull Log In Attempt');
      }
    } catch (error) {
      console.log('Error ' + error);
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
      if (data && data.result) {
        return data.result;
      }
    } catch (error) {
      console.log('Error Fetching Setting ' + error);
    }
  };

  return {
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
