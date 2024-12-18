'use client';

import { useEffect, useState } from 'react';
// Component Import
import Nav from '../../components/nav';
import Footer from '../../components/footer';
// Styling Import
import '../../styling/globals.scss';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss';

// Components Impport
import { ApiCalls } from '../../components/api';
import FormOptions from './RowOptions';
import AssigneeList from './fetchAssignee';
import DeletedTickets from './GenerateDeletedTickets';
import ArchiveTicket from './GenerateArchivedTickets';

export default function GrantedAdmin() {
  const { GetTicket, tickets, AssigneeAndContactTicket } = ApiCalls();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userID = localStorage.getItem('userID');
      // Set Authenticated Status
      setIsUserAuthenticated(userID !== null);
    }

    const fetchData = async () => {
      try {
        await GetTicket();
      } catch (error) {
        console.log('Error fetching tickets', error);
      }
    };

    fetchData();
  }, []);

  const GenerateColumnNames = () => {
    const Col = ['NAME', 'NUMBER', 'COMMENT', 'ASSIGNEE', 'DELETE'];
    return (
      <tr>
        {Col.map((item, index) => (
          <th
            key={index}
            className="col text-wrap font-weight-bold tableColumnHeader"
          >
            {item}
          </th>
        ))}
      </tr>
    );
  };

  const GenerateTickets = () => {
    return (
      <tbody>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <tr key={ticket.id} className="ticket my-2 p-2">
              <td className="col-2 text-wrap ticketText openTicketName text-break">
                {ticket.Name}
              </td>
              <td className="col-2 text-wrap ticketText text-break">
                {ticket.ContactNumber}
              </td>
              <td className="col-4 text-wrap ticketText text-break">
                {ticket.Comment}
              </td>
              <AssigneeList id={ticket.id} Name={ticket.Name} />
              <td className="col-4 text-wrap ticketText text-break">
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
    );
  };

  if(!isUserAuthenticated) {
    return(
      <div className='d-flex justify-content-center flex-column align-items-center errorContainer'>
        <h1 className='m-4'>Access Denied to this page.</h1>
        <h2 className='m-4'>Please click the back button</h2>
      </div>
    )
  }

  return (
    <>
      <Nav />
      <section className="mainTicketSection d-flex container-fluid w-100">
        <div className="w-100 d-flex justify-content-center align-items-center">
          <h1 className="openTicketTitle">Ticket Portal</h1>
        </div>
      </section>
      <section className="ticketSection container-fluid p-3 my-4 d-flex flex-column">
        <div className="openTicketTextContainer container p-2 ">
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
                <span className="bg-success p-2 mx-3 rounded SuccessbuttonTicket">
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
              <div className="accordion-body bg-light" id="openTicketContainer">
                <table className="table table-light ticketContainer rounded-3">
                  <thead>
                    {/* Generate Column Names */}
                    <GenerateColumnNames />
                  </thead>
                  {/* Generate All Ticket Functionality */}
                  <GenerateTickets />
                </table>
              </div>
            </div>
          </div>
        </div>
        <DeletedTickets />
        <ArchiveTicket />
      </section>
      <Footer />
    </>
  );
}
