'use client';

import { useState } from "react";
type InputValues = {
    UsernameValue : string,
    PasswordValue : string;
}


export default function AdminForm(){
    const [usernameInput, setusernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    const SubmitForm = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Checks Valid Input Enteries
        if(usernameInput && passwordInput){
            // Continue
        } else{
            alert("Please enter username or password");
            setusernameInput("");
            setPasswordInput("");
        }
    }

    // Checkbox functionality
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
  
    };

    return (
        <>
            <form id="adminLogInForm" onSubmit={(e) => SubmitForm(e)} className="adminLogInForm" aria-label="adminLogInForm">
                <div className="usernameContainer">
                    <label htmlFor="">Enter Username</label>
                    <input 
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setusernameInput(e.target.value)}
                    id="usernameInput"
                    role="input" />
                </div>
                <div className="passwordContainer">
                    <label htmlFor="">Enter Password:</label>
                    <input 
                    type={isChecked ? 'text' : 'password'}
                    placeholder="Enter Password"
                    id="passwordInput"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    role="password" />
                </div>
                <div className="passwordToggleContainer">
                    {/* Password Switch Checkbox */}
                    <label htmlFor="passwordSwitch">Click to show / hide password</label>
                    <input type="checkbox" onChange={handleToggleChange} checked={isChecked} name="passwordSwitch" id="passwordSwitch" />
                </div>
                <div id="passwordButtonContainer" className="passwordButtonContainer">
                    <button type="submit" aria-label="loginButton" id="loginButton">Log In</button>
                </div>
            </form> 
        </>
    )
}