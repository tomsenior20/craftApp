import  Nav  from "../components/nav";
export default function Contact(){
    return(
        <>
            <Nav/>
            <section>
                <div className="contactMainContainer">
                    <h1 className="contactPageTitle" aria-label="contact Main title">Contact Me</h1>
                </div>
            </section>
            <section>
                <form aria-label="contactForm">
                    <label htmlFor="nameInput">
                        Contact Me:
                        <input 
                        type="text"
                        id="nameInput"
                        placeholder="Enter Name"
                        aria-label="form Name entry">
                        </input>
                    </label>
                    <label htmlFor="contactNumberText">
                        Enter Contact Number:
                        <input 
                        type="text"
                        id="contactNumberText"
                        placeholder="Enter Contact Number"
                        aria-label="form number entry">
                        </input>
                    </label>
                </form>
            </section>
        </>
    )
}
