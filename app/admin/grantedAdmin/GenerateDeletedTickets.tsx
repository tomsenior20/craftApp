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
      const tickets = await GetDeletedTickets();
      setDeletedTickets(tickets);
    };

    fetchTickets();
  }, [GetDeletedTickets]);

  return (
    <div className="accordion container my-1" id="accordionExampleOne">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <span className="bg-danger p-2 mx-3 rounded buttonTicket">
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
                <tr>
                  <th className="col text-wrap tableColumnHeader">NAME</th>
                  <th className="col text-wrap tableColumnHeader">
                    CONTACT NUMBER
                  </th>
                  <th className="col text-wrap tableColumnHeader">COMMENT</th>
                </tr>
              </thead>
              <tbody>
                {deletedTickets.length > 0 ? (
                  deletedTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className=" ticketText">{ticket.Name}</td>
                      <td className=" ticketText">{ticket.ContactNumber}</td>
                      <td className=" ticketText">{ticket.Comment}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No Tickets Present</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
