"use client";

import { useEffect, useState } from 'react';
import '../styling/footer.css';

const port : number = 3010;

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
    const url = `http://localhost:${port}/getTrademarkName`;
    
    useEffect(() => {
        fetch(url, {
            method: "GET"
        })
        .then((response) => {
            if(!response.ok){ console.log("Network is not okay")}
                return response.json();
            })
        .then((data) => {   
            if(data){
                setTrademarkname(data[0].TradeMarkName);
            }
        })
        .catch((error) => {
            console.log("FetchTrademark: " + error);
        })
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