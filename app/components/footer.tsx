'use client';

import { useEffect, useState } from 'react';
import '../styling/footer.scss';
import { ApiCalls, fetchData } from './api';

// Generates Current Year for trademark footer
const GenerateCurrentYear = () => {
  const [currentYear, setCurrentYear] = useState<string>('');
  useEffect(() => {
    const year = new Date().getFullYear().toString();
    year ? setCurrentYear(year) : console.log('Current year is null');
  }, []);
  // Returns Current Year
  return <p>{currentYear}</p>;
};

const FetchTrademark = () => {
  const [tradeMarkName, setTrademarkname] = useState<string>('');
  const { FetchTradeMark } = ApiCalls();
  useEffect(() => {
    const getTradeMark = async () => {
      try {
        const result = await FetchTradeMark();
        setTrademarkname(result[0].TradeMarkName);
      } catch (error) {
        console.log('Error fetching trademark ' + error);
      }
    };
    // Calls the Async call
    getTradeMark();
  }, []);

  return <p>Trademark: {tradeMarkName || 'No Trademark Available'}</p>;
};

export default function Footer() {
  return (
    <footer className="d-flex flex-row justify-between container-fluid">
      <div className="footerNameContainer d-flex align-items-center justify-content-start">
        <FetchTrademark />
      </div>
      <div className="currentYearContainer d-flex align-items-center justify-content-end">
        <GenerateCurrentYear />
      </div>
    </footer>
  );
}
