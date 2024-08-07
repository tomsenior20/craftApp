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
        <div className='partneshipContainerImage d-flex m-3' key={index}>
          <Image src={`/${item.Name}.svg`} 
          alt={item.Name} 
          width={200} 
          height={200}
          quality={100}
          className='rounded'
          aria-label={item.Name}/>
        </div>
      ))}
    </>
  )
}

export default function Home() {
  const tradeMarkResult = {  Name: "Tom Senior" };
  const partnerships : Partnership[] = [
    {Name: "stackoverflow"},
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
      <section className='mainSection flex-column flex-sm-row'>
          <div className='exploreHeaderContainer w-100 my-2'>
            <h1 aria-label='headerTitle' className='text-center m-3'>{HeaderTitles.Title}</h1>
            <p aria-label='headerSubTitle' className='text-center'>{HeaderTitles.SubTitle}</p>
            {/* Explore button */}
            <button id="exploreButton" type='button' role='button' aria-label='exploreButton'>Click</button>
          </div>
          <div className='headerImageContainer w-100 my-2'>
            <Image src="/Jamaica.jpg" alt='headerImage' className='rounded img-fluid m-3' aria-label="headerImage" width={200} height={200} />
          </div>
      </section>
      {/* Partnerships */}
      <div className='partnershipContainer'>
        <div className='partnershipTitleContainer'>
          <h2 aria-label='partnershipTitle'>Partnerships</h2>
        </div>
        <div className='patnershipMainContainer d-flex flex-column flex-sm-row'>
          <GenerateParnterShips PartnershipName={partnerships} />
        </div>
      </div>
      {/* Footer  */}
      <Footer />
    </>
  );
}
