import React, { useEffect } from 'react';
import { useState } from 'react';

const PortNumber: string = process.env.PORT || '3010';
const BASE_URL = `http://localhost:${PortNumber}`;

type Ticket = {
  id: number;
  Name: string;
  ContactNumber: string;
  Comment: string;
};

// Handle Data Shared function
export const handleResponse = (response: any) => {
  if (!response.ok) {
    console.log('Error Processing fetch');
    response
      .status(500)
      .json({ error: 'An error occurred while retrieving deleted tickets.' });
  }
  return response.json();
};

// Handle Data Shared Function
export const fetchData = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...options
    });
    return handleResponse(response);
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
    window.localStorage.setItem('setDeleteTicket', deletedTickets.toString());
    try {
      const data = await fetchData('retrieveTicket', {
        method: 'GET'
      });
      // Check Data Result
      if (data && data.Result) {
        setTickets(data.Result);
        setOpenTickets(data.Result.length);
        window.localStorage.setItem('openTicketLength', data.Result.length);
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

  const GetDeletedTickets = async () => {
    try {
      const data = await fetchData('retrieveDeletedTickets', {
        method: 'GET'
      });
      // Check Data Result
      if (data && data.result) {
        setDeletedTickets(data.result);
        setDeleteTicket(data.result.length);
        return data.result;
      }
    } catch (error) {
      console.log('Error fetching tickets ' + error);
    }
  };

  return {
    GetTicket,
    DeleteTicket,
    tickets,
    openTickets,
    InsertAuditLog,
    deletedTickets,
    InsertTicketToDeleted,
    GetDeletedTickets,
    listDeletedTickets
  };
};
