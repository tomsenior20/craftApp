'use client';

import  Nav  from "../components/nav";
import Footer  from "../components/footer";
import '../styling/contact.css';
import { json } from "stream/consumers";

export default function Contact(){
    const port : number = 3010;

    const Test = () =>{
        const url = `http://localhost:${port}/submitForm`;

        var nameInput = (document.getElementById("nameInput") as HTMLInputElement).value.trim();
        var numberInput = (document.getElementById("contactNumberText") as HTMLInputElement).value.trim();
        var commentInput = (document.getElementById("formComment") as HTMLInputElement).value.trim();

        if(nameInput && numberInput && commentInput ){
            // Create the Post Data Obj
            const postData = {
                name: nameInput,
                number: numberInput,
                comment: commentInput
            }
            // Post the Form
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            })
            .then((response) => {
                if(!response.ok){
                    console.log("Error submitting form " + response.statusText )
                }else{
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                nameInput = "";
                numberInput = "";
                commentInput = "";
            })
            .catch((error) => {
                console.log("error posting form" + error);
            });

        }else{
            alert("Please Enter Valid Contact Form details");
        }
    }
    return(
        <>
            <Nav/>
            <section className="contactTitleSection">
                <div className="contactMainContainer">
                    <h1 className="contactPageTitle" aria-label="contact Main title">Contact Me</h1>
                </div>
            </section>
            <section className="contactFormSection">
                <div className="contactFormInformationContainer" aria-label="contactFormInformationContainer">
                    <h2>If you are wanting to contact us, please fill in the form</h2>
                    <p>All date is completed and handled confidentially</p>
                </div>
                <form className="contactForm" aria-label="contactForm">
                    <label htmlFor="nameInput">
                        Contact Me:
                    </label>
                    <input 
                        type="text"
                        id="nameInput"
                        placeholder="Enter Name"
                        aria-label="form Name entry">
                    </input>
                    <label htmlFor="contactNumberText">
                        Enter Contact Number:
                    </label>
                    <input 
                        type="number"
                        id="contactNumberText"
                        placeholder="Enter Contact Number"
                        aria-label="form number entry">
                    </input>
                    <label htmlFor="formComment">
                        Enter Comment:
                    </label>
                    <textarea id='formComment' placeholder="Enter Comment"></textarea>
                    <button id="submitForm" className="submitForm" role="button" type="button" onClick={Test} aria-label="submitForm">Submit</button>
                </form>
            </section>
            <Footer />
        </>
    )
}
