export default function AdminForm(){
    return(
        <>
            <form id="adminLogInForm" className="adminLogInForm" aria-label="adminLogInForm">
                <div className="usernameContainer">
                    <label htmlFor="">Enter Username</label>
                    <input 
                    type="text"
                    placeholder="Enter Username"
                    id="usernameInput"
                    role="input" />
                </div>
                <div className="passwordContainer">
                    <label htmlFor="">Enter Password:</label>
                    <input 
                    type="password"
                    placeholder="Enter Password"
                    id="passwordInput"
                    role="password" />
                </div>
                <div className="passwordToggleContainer">
                    {/* Password Switch Checkbox */}
                    <label htmlFor="passwordSwitch">Click to show / hide password</label>
                    <input type="checkbox" name="passwordSwitch" id="passwordSwitch" />
                </div>
                <div id="passwordButtonContainer" className="passwordButtonContainer">
                    <button type="submit" aria-label="loginButton" id="loginButton">Log In</button>
                </div>
            </form> 
        </>
    )
}