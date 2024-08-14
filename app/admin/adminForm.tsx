'use client';

import '../styling/globals.scss';
import  "bootstrap/dist/css/bootstrap.min.css";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { fetchData } from '../components/api';

type UsernameRecord = {
    Username : string;
    Password: string;
    Admin : number;
}


export default function AdminForm(){
    const [usernameInput, setusernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const router = useRouter();

    const SubmitForm = async (e : React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        // Checks Valid Input Enteries
        if(usernameInput && passwordInput){
            const username : string = encodeURIComponent(usernameInput);
            const password : string  = encodeURIComponent(passwordInput);

            try{
                const data = await fetchData(`loginAdminForm?username=${username}&password=${password}`, { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });                         
                if(data.result.length > 0 ) {
                    handleLogIn(data.result[0])
                } else{
                    alert("User Doesn't exsist"); 
                }
            }
            catch (error) { console.log("Error " + error); }
            finally{                
                // Reset Inputs
                setusernameInput("");
                setPasswordInput("");
            }
        } 
        else{
            alert("Please enter username or password");
            // Reset Inputs
            setusernameInput("");
            setPasswordInput("");
        }
    }

    // Checkbox functionality
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
  
    };

    const handleLogIn = (d : UsernameRecord) => {
        router.push("/admin/grantedAdmin");
    }

    return (
        <>
            <form id="adminLogInForm" onSubmit={(e) => SubmitForm(e)} className="adminLogInForm d-flex flex-col" aria-label="adminLogInForm">
                <div className="usernameContainer input-group p-2">
                    <label className="input-group-text">Enter Username</label>
                    <input 
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setusernameInput(e.target.value)}
                    id="usernameInput"
                    className='form-control'
                    value={usernameInput}
                    role="textbox" />
                </div>
                <div className="passwordContainer input-group p-2">
                    <label className='input-group-text' htmlFor="">Enter Password:</label>
                    <input 
                    type={isChecked ? 'text' : 'password'}
                    placeholder="Enter Password"
                    className='form-control'
                    value={passwordInput}
                    id="passwordInput"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    role="textbox" />
                </div>
                <div className="passwordToggleContainer d-flex form-check">
                    {/* Password Switch Checkbox */}
                    <label className='form-check-label' htmlFor="passwordSwitch">Click to show / hide password</label>
                    <input type="checkbox" 
                        className='form-check-input' 
                        onChange={handleToggleChange} 
                        checked={isChecked} 
                        name="passwordSwitch" 
                        id="passwordSwitch" />
                </div>
                <div id="passwordButtonContainer" className="passwordButtonContainer">
                    <button type="submit" aria-label="loginButton" id="loginButton">Log In</button>
                </div>
            </form> 
        </>
    )
}