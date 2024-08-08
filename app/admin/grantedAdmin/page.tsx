'use client';

import { useEffect, useState } from 'react'
// Component Import
import Nav from '../../components/nav';
import Footer from '../../components/footer';
// Styling Import 
import '../../styling/globals.css';
import '../../styling/Admin/grantedAdmin/grantedAdmin.css'
import  "bootstrap/dist/css/bootstrap.min.css";

export default function GrantedAdmin(){

    // Port Number
    const port : number = 3010;
    const [tickets, setTickets] = useState<any[]>([]);
    const [openTickets, setOpenTickets] = useState(0);
    const [deletedTickets,setDeleteTicket] = useState(0);
    
    // Fetch to get all tickets
    const GetTicket = () => {
    const url = `http://localhost:${port}/retrieveTicket`;
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
        })
        .catch((error) => {
            console.log(error);
        })
    };

    // Deletes the tickets per id value
    const DeleteTicket = (id: number) => {
    const url = `http://localhost:${port}/deleteTicket?id=${id}`;
        fetch(url, {
            method: "DELETE",
        })
        .then((response) => { 
            if(response.ok){
                return response.json();
            } else{
                console.log("Error deleting record");
            }
        })
        .then((data) => {
            if(data.success){
                setDeleteTicket(prev => prev + 1);
                GetTicket();
            }
        })
        .catch((error) => {
            console.log(error);
        });
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
                <section className='p-4 my-5 mx-2 ticketSection'>
                <h2 className='my-4 text-center openTicketText'>Current Open Tickets</h2>
                <table className='table my-2'>
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
                                        className='btn btn-danger'
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
                <section className='d-flex flex-column p-4 my-4 mx-auto w-50 rounded dashboardContainer'>
                    <h3 className='text-center my-4 dashboardText'>Dashboard</h3>
                    <div className='d-flex flex-row justify-content-around my-4 py-3 w-50 mx-auto'>
                    <div className='card m-2'>
                        <div className='card-body'>
                            <p className='card-title'>Open Tickets</p>
                            <p className='card-text text-center'>{openTickets}</p>
                        </div>
                    </div>
                    <div className='card m-2'>
                        <div className='card-body'>
                            <p className="card-title">Deleted Tickets</p>
                            <p className='card-text text-center'>{deletedTickets}</p>
                        </div>
                    </div>
                    </div>
                </section>  
                <Footer/>
            </>
        )
}