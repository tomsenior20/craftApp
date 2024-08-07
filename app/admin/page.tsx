import Nav from "../components/nav";
import '../styling/Admin/admin.css';
import '../styling/globals.css'; 

// Component Import
import Form from './adminForm';
import HeaderSection from "./headerSection";
import Footer from "../components/footer";

export default function Admin() {
    return(
        <>
        <Nav/>
        {/* Header Title Section */}
        <section id="ContactTitleSection"  className="ContactTitleSection d-flex flex-column" aria-label="ContactTitleSection">
            <HeaderSection/>
        </section>
        <section id="formSection"  className="formSection p-3 d-flex my-4" aria-label="formSection">
            <Form/>
        </section>
        <Footer/>
        </>
    )
}