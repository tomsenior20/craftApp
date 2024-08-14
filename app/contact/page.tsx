'use client';

import Nav from "../components/nav";
import Footer from "../components/footer";
import { useState} from "react";
// Styling Import
import '../styling/Contact/contact.scss';
import { fetchData } from "../components/api";

export default function Contact() {
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(isSubmitting) return;
        setIsSubmitting(true);

        // Validate form fields
        if (!name.trim() || !number.trim() || !comment.trim()) {
            alert("Please fill out all fields.");
            setIsSubmitting(false);
            return;
        }

        // Create the Post Data Object
        const postData = {
            name ,
            number,
            comment
        };

        try{
            
            const data = await fetchData("submitForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData),
            });
            if(data){
                alert(data.message);
                // Reset form fields
                setName("");
                setNumber("");
                setComment("");
            }
        }
        catch(error) { 
            console.log("Error posting form: " + error); 
        }
        finally { 
            setIsSubmitting(false);
        }
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
    )
}