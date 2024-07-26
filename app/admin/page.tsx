import Nav from "../components/nav";
import '../styling/admin.css';

// Component Import
import Form from './adminForm';
import HeaderSection from "./headerSection";
import Footer from "../components/footer";

export default function Admin() {
    return(
        <>
        <Nav/>
        {/* Header Title Section */}
        <section id="ContactTitleSection"  className="ContactTitleSection" aria-label="ContactTitleSection">
            <HeaderSection/>
        </section>
        <section id="formSection"  className="formSection" aria-label="formSection">
            <Form/>
        </section>
        <Footer/>
        </>
    )
}