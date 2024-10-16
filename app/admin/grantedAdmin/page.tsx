'use client';

import { useEffect, useState } from 'react';
import Nav from '../../components/nav';
import Footer from '../../components/footer';
import '../../styling/globals.scss';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { ApiCalls } from '../../components/api';
import FormOptions from './RowOptions';
import AssigneeList from './fetchAssignee';
import DeletedTickets from './GenerateDeletedTickets';

export async function getServerSideProps() {
  const { GetTicket } = ApiCalls();
  let initialTickets = [];
  try {
    initialTickets = await GetTicket(); // Fetch tickets server-side
  } catch (error) {
    console.log('Error fetching tickets', error);
  }

  return {
    props: {
      initialTickets // Pass the tickets as props
    }
  };
}

export default function GrantedAdmin({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTickets = await GetTicket();
        setTickets(fetchedTickets);
      } catch (error) {
        console.log('Error fetching tickets', error);
      }
    };
    fetchData();
  }, []);

  const GenerateColumnNames = () => {
    const Col = ['NAME', 'CONTACT NUMBER', 'COMMENT', 'ASSIGNEE', 'DELETE'];
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
              <td className="col text-wrap ticketText">{ticket.Name}</td>
              <td className="col text-wrap ticketText">
                {ticket.ContactNumber}
              </td>
              <td className="col text-wrap ticketText">{ticket.Comment}</td>
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
    );
  };

  return (
    <>
      <Nav />
      <section className="mainSection d-flex container-fluid w-100">
        <div className="w-100 d-flex justify-content-center align-items-center">
          <h1 className="openTicketTitle">Ticket Portal</h1>
        </div>
      </section>
      <section className="ticketSection container-fluid p-3 my-4 d-flex flex-column">
        <div className="openTicketTextContainer container my-4 p-2 ">
          <h2 className="text-center openTicketText">
            Current Open Contact Tickets
          </h2>
        </div>
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
                    <GenerateColumnNames />
                  </thead>
                  <GenerateTickets />
                </table>
              </div>
            </div>
          </div>
        </div>
        <DeletedTickets />
      </section>
      <Footer />
    </>
  );
}
