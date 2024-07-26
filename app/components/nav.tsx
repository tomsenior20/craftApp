// Create client component
'use client';
// Import 
import { useEffect, useState } from 'react';
import '../styling/nav.css';
import Link from 'next/link';

    export default function Nav(){
        type Option = {
            key: string;
            value: string;
        };

        const Options : Option[] = [
            {key: "Home",value: "/"},
            {key: "Contact", value: "/contact"},
            {key: "About", value: "/about"},
            {key: "Admin", value: "/admin"}
        ];
        // Port Number
        const port : number = 3010;

        // #region Fetch Brand Name
        const [brand,setBrandName] = useState("");
        const FetchBrandName = () => {
            const url = `http://localhost:${port}/selectBrandName`;

            fetch(url, {
               method: "GET"
            })
            .then((response) => {
                if(!response.ok){ console.log("Network is not okay")}
                return response.json();
            })
            .then((data) => {
                setBrandName(data[0].BrandName);
            })
            .catch((error) => {
                console.log("FetchBrandError: " + error);
            })
        }
        // #endregion

        const GenerateOptions = ({options} : {options : Option[]}) => {
            const [currentPage, setCurrentPage] = useState("");
            
            useEffect(() => {
                const handleLoad = () => {
                    var windowPath = window.location.pathname;
                    (windowPath) ? setCurrentPage(window.location.pathname) : console.log("Window Path is null");
                }

                FetchBrandName();

                handleLoad();

                return () => {
                window.removeEventListener("load", handleLoad);
                window.removeEventListener("popstate", handleLoad);
            };

            },[])

            
            return (
                <ul>
                    {options.map((item,index) => (
                        currentPage !== item.value ? (
                            <li key={index}>
                                <Link href={item.value}>{item.key}</Link>
                            </li>
                        ) : null
                    ))}
                </ul>
            )
        };

        return(
            <nav>
                <div className="navigationNameContainer">
                    <p aria-label='navNameText'>{brand}</p>
                </div>
                <div className="navigationListContainer">
                    <GenerateOptions options={Options}/>
                </div>
            </nav>    
        )
    };