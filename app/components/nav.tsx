// Create client component
'use client';
// Import 
import  "bootstrap/dist/css/bootstrap.min.css";
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
        const [brand,setBrandName] = useState<string>("");
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
            const [currentPage, setCurrentPage] = useState<string>("");
            
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
                                <Link href={item.value} className="nav-link">{item.key}</Link>
                            </li>
                        ) : null
                    ))}
                </ul>
            )
        };

        return(
            <nav className="navbar d-flex flex-row">
                <div className="navigationNameContainer d-flex">
                    <p aria-label='navNameText' className='navbar-brand'>{brand}</p>
                </div>
                <div className="navigationListContainer d-flex">
                    <GenerateOptions options={Options}/>
                </div>
            </nav>    
        )
    };