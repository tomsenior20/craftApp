'use client';

import '../styling/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiCalls } from '../components/api';
import { Alert } from '../components/alertModal';

type UserData = {
  Username: string;
  Admin: number;
};

export default function AdminForm() {
  const [usernameInput, setusernameInput] = useState<string>('');
  const [invalidAttempt, setInvalidAttempt] = useState<number>(0);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error'>('success');
  const [accountLocked, setAccountLocked] = useState<number>(0);

  const regex = /^[a-zA-Z0-9]+$/;
  const router = useRouter();
  const { InsertAuditLog, LogInFormAttempt, LockAccount, CheckIfLocked } =
    ApiCalls();

  // Resets the form inputs
  const resetFormInputs = () => {
    setusernameInput('');
    setPasswordInput('');
  };

  const toggleAlertVisibilityAndMessage = (
    show: boolean,
    message: string,
    type: 'success' | 'error'
  ) => {
    setShowAlert(show);
    setAlertMessage(message);
    setType(type);
  };

  const handleClose = () => {
    setShowAlert(false);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage('');
    }, 1000);
  };

  const SubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usernameInput.match(regex) && !passwordInput.match(regex)) {
      await InsertAuditLog('', 'User or password is invalid');
      toggleAlertVisibilityAndMessage(
        true,
        'User or password is invalid',
        'error'
      );
      handleLogInAttempt();
      return;
    }

    const getLockedStatus = await CheckIfLocked(usernameInput);
    // Check if the getLockedStatus exists
    if (getLockedStatus.result) {
      await setAccountLocked(getLockedStatus.result.locked);
    } else {
      setAccountLocked(0);
    }

    if (usernameInput.match(regex) && passwordInput.match(regex)) {
      // Checks Valid Input Enteries
      const username: string = encodeURIComponent(usernameInput);
      const password: string = encodeURIComponent(passwordInput);
      try {
        await LogInFormAttempt(
          username,
          password,
          accountLocked,
          handleLogIn,
          failedLogIn,
          handleLocked
        );
      } catch (error) {
        console.log('Error ' + error);
      } finally {
        resetFormInputs();
      }
    } else {
      await InsertAuditLog(usernameInput, 'One or More Inputs are empty');
      toggleAlertVisibilityAndMessage(
        true,
        'One or More Inputs are empty',
        'error'
      );

      handleLogInAttempt();
      resetFormInputs();
    }
  };

  const handleLogInAttempt = () => {
    setInvalidAttempt((prevCount) => {
      const newCount = prevCount + 1;
      // Check if over,equal to 3, then lock account
      if (newCount >= 3) {
        toggleAlertVisibilityAndMessage(
          true,
          'Account is locked contact administrator',
          'error'
        );
      }
      return newCount;
    });
    return;
  };

  // Checkbox functionality
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  // Handle Locked Response
  const handleLocked = () => {
    toggleAlertVisibilityAndMessage(
      true,
      'Account is locked, contact admin',
      'error'
    );
  };

  const handleLogIn = (userData: UserData) => {
    setInvalidAttempt(0);
    // Sets the local userid,admin to local storage for furture usage.
    localStorage.setItem('userID', userData.Username);
    localStorage.setItem('admin', userData.Admin.toString());
    // Redirects to alternative page is successful
    router.push('/admin/grantedAdmin');
  };

  const failedLogIn = async (username: string) => {
    handleLogInAttempt();
    toggleAlertVisibilityAndMessage(
      true,
      'Invalid Username or password',
      'error'
    );
    if (invalidAttempt >= 3) {
      try {
        // Lock account, reset attempt number
        await LockAccount(username);
        await setInvalidAttempt(0);
      } catch (error: any) {
        console.log('Error locking account attempt', error);
      }
    }
  };

  return (
    <>
      <Alert
        type={type}
        message={alertMessage}
        isVisible={showAlert}
        onClose={handleClose}
      />
      <form
        id="adminLogInForm"
        onSubmit={(e) => SubmitForm(e)}
        className="adminLogInForm d-flex flex-col bg-dark shadow-lg rounded"
        aria-label="adminLogInForm"
      >
        <h1 className="text-center my-3 p-2 formText">Sign In </h1>
        <div className="usernameContainer form-floating my-3">
          <input
            type="text"
            placeholder=""
            onChange={(e) => setusernameInput(e.target.value)}
            id="usernameInput"
            className="form-control"
            value={usernameInput}
            role="textbox"
          />
          <label className="" htmlFor="usernameInput">
            Enter Username
          </label>
        </div>
        <div className="passwordContainer form-floating my-3">
          <input
            type={isChecked ? 'text' : 'password'}
            placeholder=""
            className="form-control"
            value={passwordInput}
            id="passwordInput"
            onChange={(e) => setPasswordInput(e.target.value)}
            role="textbox"
          />
          <label className="text-dark pt-3" htmlFor="passwordInput">
            Enter Password:
          </label>
        </div>
        <div className="passwordToggleContainer d-flex form-check">
          {/* Password Switch Checkbox */}
          <label
            className="form-check-label formCheckbox"
            htmlFor="passwordSwitch"
          >
            Click to show / hide password
          </label>
          <input
            type="checkbox"
            className="form-check-input p-2"
            onChange={handleToggleChange}
            checked={isChecked}
            name="passwordSwitch"
            id="passwordSwitch"
          />
        </div>
        <div
          id="passwordButtonContainer"
          className="passwordButtonContainer flex-grow-1"
        >
          <button type="submit" aria-label="loginButton" id="loginButton">
            Log In
          </button>
        </div>
      </form>
    </>
  );
}
