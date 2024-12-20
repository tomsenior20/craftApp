'use client';

import Nav from './components/nav';
import Footer from './components/footer';

import Image from 'next/image';
import './styling/globals.scss';
import './styling/pages.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Partnership {
  Name: string;
  Desc: string;
}

interface CompanyInformation {
  Title: string;
  SubTitle: string;
}

// Generate Patnerships Code
const GenerateParnterShips = ({
  PartnershipName
}: {
  PartnershipName: Partnership[];
}) => {
  return (
    <>
      {PartnershipName.map((item, index) => (
        <div className="partneshipContainerImage d-flex card" key={index}>
          <div className="card-body d-flex flex-column h-100">
            <Image
              src={`/${item.Name}.svg`}
              alt={item.Name}
              width={100}
              height={100}
              layout="responsive"
              quality={100}
              className="rounded"
              aria-label={item.Name}
            />
            <h4 className="card-title my-2 p-2">{item.Name}</h4>
            <h5 className="card-text my-2 p-2 flex-grow-1">{item.Desc}</h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default function Home() {
  const router = useRouter();

  const partnerships: Partnership[] = [
    {
      Name: 'stackoverflow',
      Desc: 'This Partnership collobrates with Stackoverflow, providing help with all technology matters'
    },
    {
      Name: 'github',
      Desc: 'Providing a repositry to allow code to be kept and maintained, allowing full progression and growth'
    }
  ];

  const HeaderTitles: CompanyInformation = {
    Title: 'Market Leaders within the craft market',
    SubTitle: 'Explore More....'
  };

  const ExploreToAdminLogin = () => {
    router.push('./admin');
  };

  return (
    <>
      {/* Navigation */}
      <Nav />
      {/* Main Section */}
      <section className="mainSection flex-column container-fluid flex-sm-row">
        <div className="exploreHeaderContainer my-2">
          <h1 aria-label="headerTitle" className="text-center m-3">
            {HeaderTitles.Title}
          </h1>
          <p aria-label="headerSubTitle" className="text-center">
            {HeaderTitles.SubTitle}
          </p>
          {/* Explore button */}
          <button
            id="exploreButton"
            type="button"
            role="button"
            onClick={ExploreToAdminLogin}
            aria-label="exploreButton"
          >
            Explore Our Market
          </button>
        </div>
        <div className="headerImageContainer my-2">
          <Image
            src="/Jamaica.jpg"
            alt="headerImage"
            className="rounded img-fluid m-3"
            aria-label="headerImage"
            quality={75}
            priority={true}
            loading="eager"
            layout="intrinsic"
            width={400}
            height={400}
          />
        </div>
      </section>
      {/* General Purpose of website */}
      <div className="container-fluid exploreContainer">
        <h3>Why is Producity Growth?</h3>
        <p>
          Sign into our portal to explore how centralizing tickets and options
          boosts productivity
        </p>
      </div>
      {/* Partnerships */}
      <div className="partnershipContainer">
        <div className="partnershipTitleContainer">
          <h2 aria-label="partnershipTitle">Partnerships</h2>
        </div>
        <div className="patnershipMainContainer d-flex flex-column flex-sm-row">
          <GenerateParnterShips PartnershipName={partnerships} />
        </div>
      </div>
      {/* Footer  */}
      <Footer />
    </>
  );
}
