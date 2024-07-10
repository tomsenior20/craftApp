import Nav from './components/nav';
import Footer from './components/footer';

import Image from 'next/image';
import './styling/globals.css';
import './styling/pages.css';

interface Partnership{
    Name: string;
}

interface CompanyInformation{
  Title: string;
  SubTitle: string;
}

// Generate Patnerships Code
const GenerateParnterShips = ({PartnershipName}: {PartnershipName : Partnership[]}) => {
  return (
    <>
      {PartnershipName.map((item,index) => (
        <div className='partneshipContainerImage' key={index}>
          <Image src={`./${item.Name}.png`} alt={item.Name} width={200} height={200}/>
        </div>
      ))}
    </>
  )
}

export default function Home() {
  const tradeMarkResult = {  Name: "Tom Senior" };
  const partnerships : Partnership[] = [
    {Name: "bmw"},
    {Name: "github"}
  ];

  const HeaderTitles : CompanyInformation = {
    Title : "Market Leaders within the craft market",
    SubTitle : "Explore More...."
  }

  return (
    <>
      {/* Navigation */}
      <Nav />
      {/* Main Section */}
      <section className='mainSection'>
          <div className='headerImageContainer'>
            <Image src="/bmw.png" alt='headerImage' width={200} height={200} />
          </div>
          <div className='exploreHeaderContainer'>
            <h1>{HeaderTitles.Title}</h1>
            <p>{HeaderTitles.SubTitle}</p>
            <button>Click</button>
          </div>
      </section>
      {/* Partnerships */}
      <div className='partnershipContainer'>
        <div>
          <h3>Partneships:</h3>
        </div>
        <div className='patnershipMainContainer'>
          <GenerateParnterShips PartnershipName={partnerships} />
        </div>
      </div>
      {/* Footer  */}
      <Footer trademark={tradeMarkResult} />
    </>
  );
}
