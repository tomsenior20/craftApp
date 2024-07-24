// Create client component
'use client';
// Import 
import { useEffect, useState } from 'react';
import '../styling/nav.css';
import Link from 'next/link';
import { Console } from 'console';

    export default function Nav(){
        type Option = {
            key: string;
            value: string;
        };

        const Options : Option[] = [
            {key: "Home",value: "/"},
            {key: "Contact", value: "/contact"},
            {key: "About", value: "/about"}
        ];

        const GenerateOptions = ({options} : {options : Option[]}) => {
            const [currentPage, setCurrentPage] = useState("");

            useEffect(() => {
                const handleLoad = () => {
                    var windowPath = window.location.pathname;
                    if(windowPath){
                        setCurrentPage(window.location.pathname);
                    } else{
                        console.log("Window Path is null");
                    }
                }

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
                    <p aria-label='navNameText'>Tom Senior</p>
                </div>
                <div className="navigationListContainer">
                    <GenerateOptions options={Options}/>
                </div>
            </nav>    
        )
    };