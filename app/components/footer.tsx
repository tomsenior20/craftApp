"use client";

import { useEffect, useState } from 'react';
// Styling Imports
import '../styling/footer.scss';
import { fetchData } from './api';

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

    
    useEffect(() => {
        const getTradeMark = async () => {
            try{
                const data = await fetchData('getTrademarkName', {
                    method: 'GET'
                })
                if(data && data.length > 0){ 
                    setTrademarkname(data[0].TradeMarkName); }
            }    
            catch(error){
                console.log("Error fetching trademark " + error);
            }
        }
        // Calls the Async call
        getTradeMark();
    },[]);

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