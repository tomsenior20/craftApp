'use client';

import { useEffect, useState } from 'react'
// Component Import
import Nav from '../../components/nav';
import Footer from '../../components/footer';
// Styling Import 
import '../../styling/globals.scss';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss'
import  "bootstrap/dist/css/bootstrap.min.css";

import { fetchData, handleResponse } from '../../components/api';
import AssigneeList from './fetchAssignee';

type Ticket = {
    id: number, 
    Name: string,
    ContactNumber: string,
    Comment:string,
}


export default function GrantedAdmin() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [openTickets, setOpenTickets] = useState<number>(0);
    const [deletedTickets,setDeleteTicket] = useState<number>(0);
    
    // Fetch to get all tickets
    const GetTicket = async () => {
    window.localStorage.setItem('setDeleteTicket', deletedTickets.toString());
        try{
            const data = await fetchData('retrieveTicket', {
                method: 'GET',
            });
            // Check Data Result
            if(data && data.Result){
                setTickets(data.Result);
                setOpenTickets(data.Result.length);
                window.localStorage.setItem("openTicketLength", data.Result.length);
            }
        }
        catch(error){
            console.log("Error fetching tickets " + error);
        }
    };

    // Deletes the tickets per id value
    const DeleteTicket = async (id: number) => {
    try{
            const data = await fetchData(`deleteTicket?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(data && data.success){
                setDeleteTicket(prev => prev + 1);
                window.localStorage.setItem('setDeleteTicket', deletedTickets.toString());
                GetTicket();
            }
        }
        catch(error){
            console.log("Error deleting record: " + error);
        }
    };


    // Renders the Tickets to the page
    useEffect(() => {
        GetTicket();
    },[]);

        return(
            <>
                <Nav />
                <section className='mainSection d-flex container-fluid w-100'>
                    <div className='w-100 d-flex justify-content-center align-items-center'>
                        <h1 className='openTicketTitle'>Ticket Portal</h1>
                    </div>
                </section>
                <section className='ticketSection container-fluid'>
                <div className='openTicketTextContainer container'>
                    <h2 className='my-4 text-center openTicketText'>Current Open Contact Tickets Tickets</h2>
                </div>
                {/* Current Open Ticket Table */}
                <div className='ticketTableContainer container my-4'>
                <table className='table ticketContainer'>
                    <thead>
                        <tr>
                        <th className="col text-wrap">Name</th>
                        <th className="col text-wrap">Contact Number</th>
                        <th className="col text-wrap">Comment</th>
                        <th className='col text-wrap'>Assignee</th>
                        <th className='col text-wrap' >Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <tr key={ticket.id} className='ticket'>
                                <td className='col text-wrap'>{ticket.Name}</td>
                                <td className='col text-wrap'>{ticket.ContactNumber}</td>
                                <td className='col text-wrap'>{ticket.Comment}</td>
                                <AssigneeList/>
                                <td className='col text-wrap'>
                                    <button 
                                        type='button'
                                        className='btn btn-danger deleteButton'
                                        onClick={() => DeleteTicket(ticket.id)}>Delete
                                    </button>
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
                </section>
                {/* Dashboard section */}
                <section className='d-flex flex-column p-4  w-100 rounded dashboardContainer container-fluid'>
                    <h3 className='text-center my-4 p-4 dashboardText'>Dashboard</h3>
                    <div className='d-flex flex-sm-row flex-column justify-content-center w-100 dashboardStatsContainer container'>
                    <div className='card dashboardCard openTicketCard'>
                        <div className='card-body'>
                            <p className='card-title dashboardFigureText'>Open Tickets</p>
                            <p className='card-text text-center dashboardFigureTotal'>{openTickets}</p>
                        </div>
                    </div>
                    <div className='card dashboardCard deletedTicketCard'>
                        <div className='card-body'>
                            <p className="card-title dashboardFigureText">Deleted Tickets</p>
                            <p className='card-text text-center dashboardFigureTotal'>{deletedTickets}</p>
                        </div>
                    </div>
                    </div>
                </section>  
                <Footer/>
            </>
        )
}