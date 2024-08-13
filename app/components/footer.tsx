"use client";

import { useEffect, useState } from 'react';
// Styling Imports
import '../styling/footer.scss';

const PortNumber : string = process.env.PORT || '3010';
const BASE_URL = `http://localhost:${PortNumber}`

// Generates Current Year for trademark footer
const GenerateCurrentYear = () => {
    const [currentYear,setCurrentYear] = useState<string>("");
    useEffect(() => {
        const year = new Date().getFullYear().toString();
        (year) ? setCurrentYear(year) : console.log("Current year is null");
    },[])
    // Returns Current Year
    return( <p>{currentYear}</p> ) 
};

const FetchTrademark = () => {
    const [tradeMarkName , setTrademarkname] = useState<string>("");
    const url = `${BASE_URL}/getTrademarkName`;
    
    useEffect(() => {
        fetch(url, {
            method: "GET"
        })
        .then((response) => {
            if(!response.ok){ console.log("Network is not okay")}
                return response.json();
            })
        .then((data) => {   
            if(data){ setTrademarkname(data[0].TradeMarkName); }
        })
        .catch((error) => {console.log("FetchTrademark: " + error); })
    },[url]);

    return(
        <p>Trademark: {tradeMarkName}</p>
    )
};

export default function Footer() {
    return(
        <footer className='d-flex flex-row justify-between'>
            <div className="footerNameContainer d-flex justify-content-start">
                <FetchTrademark />
            </div>
            <div className='currentYearContainer d-flex justify-content-end'>
                <GenerateCurrentYear/>
            </div>
        </footer>
    )
}