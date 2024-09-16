import Nav from '../components/nav';
// Styling Import
import '../styling/Admin/admin.scss';
import '../styling/globals.scss';

// Component Import
import Form from './adminForm';
import HeaderSection from './headerSection';
import Footer from '../components/footer';

export default function Admin() {
  return (
    <>
      <Nav />
      {/* Header Title Section */}
      <section
        id="ContactTitleSection"
        className="ContactTitleSection container-fluid d-flex mb-3 flex-column"
        aria-label="ContactTitleSection"
      >
        <HeaderSection />
      </section>
      <section
        id="formSection"
        className="formSection d-flex container-fluid"
        aria-label="formSection"
      >
        <Form />
      </section>
      <Footer />
    </>
  );
}
