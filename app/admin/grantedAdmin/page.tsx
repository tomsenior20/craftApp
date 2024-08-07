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

    const DeleteTicket = () => {
        alert("DELETE");
    }
    
    useEffect(() => {
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
                console.log(data);
                setTickets(data.Result);
            })
            .catch((error) => {
                console.log(error);
            })
        };
        GetTicket();
    },[])
        return(
            <>
                <Nav />
                <section className='mainSection d-flex w-100'>
                    <div className='w-100 d-flex justify-content-center align-items-center'>
                        <h1 className='openTicketTitle'>Current Open Tickets</h1>
                    </div>
                </section>
                <section className='p-4 my-4 mx-2'>
                <table className='table'>
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
                                        onClick={DeleteTicket}>Delete
                                    </button>
                                </td>
                            </tr>
                    ))
                ) : (
                    <tr>
                        <td>No Tickets</td>
                    </tr>
                )}
                </tbody>
                </table>
                </section>
                <Footer/>
            </>
        )
}