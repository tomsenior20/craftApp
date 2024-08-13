'use client';

import { useEffect, useState } from 'react'
// Component Import
import Nav from '../../components/nav';
import Footer from '../../components/footer';
// Styling Import 
import '../../styling/globals.scss';
import '../../styling/Admin/grantedAdmin/grantedAdmin.scss'
import  "bootstrap/dist/css/bootstrap.min.css";

const PortNumber : string = process.env.PORT || '3010';
const BASE_URL = `http://localhost:${PortNumber}`

export default function GrantedAdmin(){
    const [tickets, setTickets] = useState<any[]>([]);
    const [openTickets, setOpenTickets] = useState<number>(0);
    const [deletedTickets,setDeleteTicket] = useState<number>(0);
    
    // Fetch to get all tickets
    const GetTicket = () => {
    window.localStorage.setItem('setDeleteTicket', deletedTickets.toString());
    const url = `${BASE_URL}/retrieveTicket`;
        fetch(url, {
            method: 'GET'
        })
        .then((response) => {
            if(!response.ok){   
                console.log("Error fetching data");
            } else{
                return response.json();
            }
        })
        .then((data) => {
            setTickets(data.Result);
            setOpenTickets(data.Result.length);
            window.localStorage.setItem("openTicketLength", data.Result.length);
        })
        .catch((error) => { console.log(error); })
    };

    // Deletes the tickets per id value
    const DeleteTicket = (id: number) => {
    const url = `${BASE_URL}/deleteTicket?id=${id}`;
        fetch(url, {
            method: "DELETE",
        })
        .then((response) => { 
            if(!response.ok){
                console.log("Error deleting record");
                return;
            } else{
                return response.json();
            }
        })
        .then((data) => {
            if(data.success){
                setDeleteTicket(prev => prev + 1);
                window.localStorage.setItem('setDeleteTicket', deletedTickets.toString());
                GetTicket();
            }
        })
        .catch((error) => { console.log(error); });
    }

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
                <section className='p-4 ticketSection'>
                <h2 className='my-4 text-center p-4 openTicketText'>Current Open Tickets</h2>
                {/* Current Open Ticket Table */}
                <table className='table my-2 ticketContainer'>
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Comment</th>
                        <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tickets.length > 0 ? (
                        tickets.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.Name}</td>
                                <td>{item.ContactNumber}</td>
                                <td>{item.Comment}</td>
                                <td>
                                    <button 
                                        type='button'
                                        className='btn btn-danger deleteButton'
                                        onClick={() => DeleteTicket(item.id)}>Delete
                                    </button>
                                </td>
                            </tr>
                    ))
                ) : (
                    <tr>
                        <td>No Tickets</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )}
                </tbody>
                </table>
                </section>
                {/* Dashboard section */}
                <section className='d-flex flex-column p-4  w-100 rounded dashboardContainer'>
                    <h3 className='text-center my-4 p-4 dashboardText'>Dashboard</h3>
                    <div className='d-flex flex-row justify-content-center my-4 py-3 w-50 mx-auto'>
                    <div className='card m-2 dashboardCard openTicketCard'>
                        <div className='card-body'>
                            <p className='card-title dashboardFigureText'>Open Tickets</p>
                            <p className='card-text text-center dashboardFigureTotal'>{openTickets}</p>
                        </div>
                    </div>
                    <div className='card m-2 dashboardCard deletedTicketCard'>
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