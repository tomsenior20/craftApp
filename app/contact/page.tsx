'use client';

import Nav from "../components/nav";
import Footer from "../components/footer";
import '../styling/Contact/contact.css';
import { useState } from "react";

export default function Contact() {
    const port = 3010;
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate form fields
        if (!name.trim() || !number.trim() || !comment.trim()) {
            alert("Please fill out all fields.");
            return; // Exit the function if any field is empty
        }

        const url = `http://localhost:${port}/submitForm`;

        // Create the Post Data Object
        const postData = {
            name,
            number,
            comment
        };

        // Post the Form
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then((response) => {
            if (!response.ok) {
                console.log("Error submitting form " + response.statusText);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            alert(data.message);
            // Reset form fields
            setName("");
            setNumber("");
            setComment("");
        })
        .catch((error) => {
            console.log("Error posting form: " + error);
        });
    };

    return (
        <>
            <Nav />
            <section className="contactTitleSection">
                <div className="contactMainContainer">
                    <h1 className="contactPageTitle" aria-label="contact Main title">Contact Me</h1>
                </div>
            </section>
            <section className="contactFormSection d-flex flex-column flex-sm-row">
                <div className="contactFormInformationContainer w-100" aria-label="contactFormInformationContainer">
                    <h2>If you are wanting to contact us, please fill in the form</h2>
                    <p>All data is completed and handled confidentially</p>
                </div>
                <form className="contactForm w-100 d-flex p-2" aria-label="contactForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="nameInput" className="input-group-text formLabel">
                            Contact Me:
                        </label>
                        <input
                            type="text"
                            id="nameInput"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            aria-label="form Name entry" />
                    </div>
                    <div className="input-group">
                        <label className="input-group-text formLabel" htmlFor="contactNumberText">
                            Enter Contact Number:
                        </label>
                        <input
                            type="number"
                            id="contactNumberText"
                            className="form-control"
                            value={number}
                            placeholder="Enter Contact Number"
                            onChange={(e) => setNumber(e.target.value)}
                            aria-label="form number entry" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="formComment" className="input-group-text formLabel">
                            Enter Comment:
                        </label>
                        <textarea
                            id='formComment'
                            placeholder="Enter Comment"
                            className="form-control"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                    </div>
                    <button
                        id="submitForm"
                        className="submitForm"
                        role="button"
                        type="submit"
                        aria-label="submitForm">Submit</button>
                </form>
            </section>
            <Footer />
        </>
    );
}