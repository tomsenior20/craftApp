import { useEffect, useState } from 'react';
import { ApiCalls } from '@/app/components/api';
import Script from 'next/script';

export default function GenerateArchiveTickets() {
  interface Ticket {
    Name: string;
    ContactNumber: string;
    Comment: string;
    id: number;
  }

  const [archiveTickets, setArchiveTicket] = useState<Ticket[]>([]);
  // Set default to 1 = false;
  const [adminpriv, setAdminPriv] = useState<number>(1);

  // Import function from shared file.
  const { GetArchiveTickets, RetrieveSetting } = ApiCalls();
  // Renders Archive Ticket on page load
  useEffect(() => {
    // Get Archive Tickets - API Call
    const GetArchiveTicket = async () => {
      try {
        const archiveTicket = await GetArchiveTickets();
        setArchiveTicket(Array.isArray(archiveTicket) ? archiveTicket : []);
      } catch (error: any) {
        console.log('GetArchiveTicket error:', error);
      }
    };
    // Get Admin priv - API Call
    const AdminSettingRetrieval = async () => {
      try {
        const adminPrivilege = await RetrieveSetting('Admin');
        setAdminPriv(adminPrivilege ? adminPrivilege.Active : 1);
      } catch (error: any) {
        console.log('GetArchiveTicket error:', error);
      }
    };

    GetArchiveTicket();
    AdminSettingRetrieval();
  }, []);

  // Generate Column Names
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

  const GenerateArchiveTicketData = () => {
    return (
      <>
        {archiveTickets.length > 0 ? (
          archiveTickets.map((ticket) => (
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
    <>
      {/* Checks the Setting table priv, and admin of user saved upon logging in */}
      {adminpriv === 0 && localStorage.getItem('admin') === '0' ? (
        <div
          className="accordion container my-4 p-2"
          id="accordionExampleThree"
        >
          <div className="accordion-item accordionDiv">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <span className="bg-danger p-2 mx-3 rounded ArchiveButtonText">
                  {archiveTickets.length} - Archived Tickets
                </span>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExampleThree"
            >
              <div className="accordion-body bg-light">
                <table className="table table-light ticketContainer rounded-3">
                  <thead>{GenerateColumnNames()}</thead>
                  <tbody>{GenerateArchiveTicketData()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="noAdminPrivContainer container-fluid p-4">
          <p className="noAdminText">
            You must have admin privileges to see archived tickets
          </p>
        </div>
      )}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />
    </>
  );
}
