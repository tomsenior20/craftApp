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
          <Image src={`/${item.Name}.svg`} 
          alt={item.Name} 
          width={300} 
          height={300}
          quality={100}
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
      <section className='mainSection'>
          <div className='headerImageContainer'>
            <Image src="/Jamaica.jpg" alt='headerImage' aria-label="headerImage" width={200} height={200} />
          </div>
          <div className='exploreHeaderContainer'>
            <h1 aria-label='headerTitle'>{HeaderTitles.Title}</h1>
            <p aria-label='headerSubTitle'>{HeaderTitles.SubTitle}</p>
            {/* Explore button */}
            <button id="exploreButton" type='button' role='button' aria-label='exploreButton'>Click</button>
          </div>
      </section>
      {/* Partnerships */}
      <div className='partnershipContainer'>
        <div className='partnershipTitleContainer'>
          <h2 aria-label='partnershipTitle'>Partnerships</h2>
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
