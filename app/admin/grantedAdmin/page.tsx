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
                <section className='mainSection d-flex w-100'>
                    <div className='w-100 d-flex justify-content-center align-items-center'>
                        <h1 className='openTicketTitle'>Ticket Portal</h1>
                    </div>
                </section>
                <section className='ticketSection'>
                <div className='openTicketTextContainer'>
                    <h2 className='my-4 text-center openTicketText'>Current Open Contact Tickets Tickets</h2>
                </div>
                {/* Current Open Ticket Table */}
                <div className='ticketTableContainer'>
                <table className='table my-2 ticketContainer'>
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Comment</th>
                        <th scope='col'>Assignee</th>
                        <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <tr key={ticket.id} className='ticket'>
                                <td>{ticket.Name}</td>
                                <td>{ticket.ContactNumber}</td>
                                <td>{ticket.Comment}</td>
                                <AssigneeList/>
                                <td>
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
                <section className='d-flex flex-column p-4  w-100 rounded dashboardContainer'>
                    <h3 className='text-center my-4 p-4 dashboardText'>Dashboard</h3>
                    <div className='d-flex flex-row justify-content-center w-100 dashboardStatsContainer'>
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