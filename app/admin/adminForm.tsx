'use client';

import '../styling/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchData, ApiCalls } from '../components/api';
import { Alert } from '../components/alertModal';

type UsernameRecord = {
  Username: string;
  Password: string;
  Admin: number;
};

export default function AdminForm() {
  const [usernameInput, setusernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false); // State for alert visibility
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [type, setType] = useState<'success' | 'error'>('success');

  const regex = /^[a-zA-Z]+$/;
  const router = useRouter();
  const { InsertAuditLog } = ApiCalls();

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
    // Checks Valid Input Enteries
    if (usernameInput.match(regex) && passwordInput.match(regex)) {
      const username: string = encodeURIComponent(usernameInput);
      const password: string = encodeURIComponent(passwordInput);
      try {
        const data = await fetchData(
          `loginAdminForm?username=${username}&password=${password}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        if (data.result.length > 0) {
          handleLogIn(data.result[0]);
          await InsertAuditLog(username, 'Successfull Log In Attempt');
        } else {
          await InsertAuditLog(username, 'User or password is invalid');
          toggleAlertVisibilityAndMessage(
            true,
            'User or password is invalid',
            'error'
          );
        }
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
      resetFormInputs();
    }
  };

  // Checkbox functionality
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleLogIn = (d: UsernameRecord) => {
    router.push('/admin/grantedAdmin');
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
