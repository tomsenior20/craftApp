import  Nav  from "../components/nav";
import Footer  from "../components/footer";
import '../styling/contact.css';

export default function Contact(){
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
                        type="text"
                        id="contactNumberText"
                        placeholder="Enter Contact Number"
                        aria-label="form number entry">
                    </input>
                    <label htmlFor="formComment">
                        Enter Comment:
                    </label>
                    <textarea id='formComment' placeholder="Enter Comment"></textarea>
                    <button id="submitForm" className="submitForm" role="button" type="button" aria-label="submitForm">Submit</button>
                </form>
            </section>
            <Footer />
        </>
    )
}
