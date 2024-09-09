'use client';

import { useEffect, useState } from 'react';
// Component Import
import Nav from '../../components/nav';
import Footer from '../../components/footer';
// Styling Import
import '../../styling/globals.scss';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { ApiCalls } from '../../components/api';
import FormOptions from './RowOptions';
import AssigneeList from './fetchAssignee';
import DeletedTickets from './GenerateDeletedTickets';
export default function GrantedAdmin() {
  const { GetTicket, tickets, openTickets, deletedTickets } = ApiCalls();

  // Renders the Tickets to the page
  useEffect(() => {
    GetTicket();
  }, []);

  return (
    <>
      <Nav />
      <section className="mainSection d-flex container-fluid w-100">
        <div className="w-100 d-flex justify-content-center align-items-center">
          <h1 className="openTicketTitle">Ticket Portal</h1>
        </div>
      </section>
      <section className="ticketSection container-fluid p-3 m-2 d-flex flex-column">
        <div className="openTicketTextContainer container my-4 p-2 ">
          <h2 className="text-center openTicketText">
            Current Open Contact Tickets
          </h2>
        </div>
        {/* Current Open Ticket Table */}
        <div className="accordion ticketTableContainer container my-4 p-2">
          <div className="accordion-item accordionDiv">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <span className="bg-success p-2 mx-3 rounded buttonTicket">
                  {tickets.length} - Open Tickets
                </span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body bg-light">
                <table className="table table-light ticketContainer rounded-3">
                  <thead>
                    <tr>
                      <th className="col text-wrap font-weight-bold tableColumnHeader">
                        NAME
                      </th>
                      <th className="col text-wrap font-weight-bold tableColumnHeader">
                        CONTACT NUMBER
                      </th>
                      <th className="col text-wrap font-weight-bold tableColumnHeader">
                        COMMENT
                      </th>
                      <th className="col text-wrap font-weight-bold tableColumnHeader">
                        ASSIGNEE
                      </th>
                      <th className="col text-wrap font-weight-bold tableColumnHeader">
                        DELETE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.length > 0 ? (
                      tickets.map((ticket) => (
                        <tr key={ticket.id} className="ticket my-2 p-2">
                          <td className="col text-wrap ticketText">
                            {ticket.Name}
                          </td>
                          <td className="col text-wrap ticketText">
                            {ticket.ContactNumber}
                          </td>
                          <td className="col text-wrap ticketText">
                            {ticket.Comment}
                          </td>
                          <AssigneeList />
                          <td className="col text-wrap ticketText">
                            <FormOptions ticketID={ticket.id} record={ticket} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>No Tickets</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <DeletedTickets />
      </section>
      {/* Dashboard section */}
      <section className="d-flex flex-column p-4  w-100 rounded dashboardContainer container-fluid">
        <h3 className="text-center my-4 p-4 dashboardText">Dashboard</h3>
        <div className="d-flex flex-sm-row flex-column justify-content-center w-100 dashboardStatsContainer">
          <div className="card dashboardCard openTicketCard rounded-3">
            <div className="card-body">
              <p className="card-title dashboardFigureText">Open Tickets</p>
              <p className="card-text text-center dashboardFigureTotal">
                {openTickets}
              </p>
            </div>
          </div>
          <div className="card dashboardCard deletedTicketCard rounded-3">
            <div className="card-body">
              <p className="card-title dashboardFigureText">Deleted Tickets</p>
              <p className="card-text text-center dashboardFigureTotal">
                {deletedTickets}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
