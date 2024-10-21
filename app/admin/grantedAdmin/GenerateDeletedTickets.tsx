'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiCalls } from '@/app/components/api';
import Script from 'next/script';

interface Ticket {
  Name: string;
  ContactNumber: string;
  Comment: string;
  id: number;
}

export default function DeletedTickets() {
  const { GetDeletedTickets } = ApiCalls();
  const [deletedTickets, setDeletedTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await GetDeletedTickets();
        setDeletedTickets(Array.isArray(tickets) ? tickets : []);
      } catch (error: any) {
        console.error('Failed to fetch deleted tickets', error);
        setError('Failed to fetch deleted tickets. Please try again.');
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
              <td className="ticketText" id="ticketName">
                {ticket.Name}
              </td>
              <td className="ticketText" id="ticketContactNumber">
                {ticket.ContactNumber}
              </td>
              <td className="ticketText" id="ticketComment">
                {ticket.Comment}
              </td>
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
            {error && <div className="alert alert-danger">{error}</div>}
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
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
