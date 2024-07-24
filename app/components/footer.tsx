"use client";

import { useEffect, useState } from 'react';
import '../styling/footer.css';

interface TradeMark{
    Name: string;
}

// Generates Current Year for trademark footer
const GenerateCurrentYear = () => {
    const [currentYear,setCurrentYear] = useState("");
    useEffect(() => {
        const year = new Date().getFullYear().toString();
        (year) ? setCurrentYear(year) : console.log("Current year is null");
    },[])
    // Returns Current Year
    return( <p>{currentYear}</p> ) 
}

export default function Footer({ trademark }: { trademark : TradeMark}) {
    return(
        <footer>
            <div className="footerNameContainer">
                <p>Trademark: {trademark.Name}</p>
            </div>
            <div className='currentYearContainer'>
                <GenerateCurrentYear/>
            </div>
        </footer>
    )
}