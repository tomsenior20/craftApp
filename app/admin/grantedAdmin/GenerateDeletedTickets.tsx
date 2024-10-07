'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { ApiCalls } from '@/app/components/api';

interface Ticket {
  Name: string;
  ContactNumber: string;
  Comment: string;
  id: number;
}

export default function DeletedTickets() {
  const { GetDeletedTickets } = ApiCalls();
  const [deletedTickets, setDeletedTickets] = useState<Ticket[]>([]);

  // Fetch tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await GetDeletedTickets();
        setDeletedTickets(tickets);
      } catch (error) {
        console.error('Failed to fetch deleted tickets', error);
      }
    };

    fetchTickets();
  }, []);

  const GenerateColumnNames = () => {
    const Columns = ['NAME', 'CONTACT NUMBER', 'COMMENT'];
    return (
      <tr>
        {Columns.map((col, index) => (
          <th
            key={index}
            className="col text-wrap tableColumnHeader"
            scope="col"
          >
            {col}
          </th>
        ))}
      </tr>
    );
  };

  const GenerateDeletedTicket = () => {
    return (
      <>
        {deletedTickets.length > 0 ? (
          deletedTickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="ticketText">{ticket.Name}</td>
              <td className="ticketText">{ticket.ContactNumber}</td>
              <td className="ticketText">{ticket.Comment}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Tickets Present</td>
          </tr>
        )}
      </>
    );
  };

  return (
    <div className="accordion container my-4 p-2" id="accordionExampleOne">
      <div className="accordion-item accordionDiv">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <span className="bg-danger p-2 mx-3 rounded DeletebuttonTicket">
              {deletedTickets.length} - Deleted Tickets
            </span>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExampleOne"
        >
          <div className="accordion-body bg-light">
            <table className="table table-light ticketContainer rounded-3">
              <thead>
                <GenerateColumnNames />
              </thead>
              <tbody>
                <GenerateDeletedTicket />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
