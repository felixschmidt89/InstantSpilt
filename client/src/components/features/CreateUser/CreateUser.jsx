// React and Third-Party Libraries
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../utils/errorUtils";

// Components
import ErrorDisplay from "../../common/ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./CreateUser.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for creating a new user within a group.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {function} props.toggleDataRefresh - Function to toggle data refresh in the parent component.
 * @returns {JSX.Element} - React component.
 */
const CreateUser = ({ toggleDataRefresh }) => {
  const inputRef = useRef(null);

  const groupCode = localStorage.getItem("activeGroupCode");

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // On form submission: Provide groupCode for authentication, post unique user within group, clear form & trigger a parent component refresh
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, {
        userName,
        groupCode,
      });
      devLog("User created:", response);
      setUserName("");
      // toggle refresh in parent component to rerender user list
      toggleDataRefresh();
      setError("");
    } catch (error) {
      // Render conflict status message if there is already a group member with same name
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        devLog("Error creating user.", error);
        setError("Error creating user. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add user</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='user name'
          required
          minLength={1}
          maxLength={50}
          pattern='.*\S+.*'
          className={styles.inputField}
          ref={inputRef}
          autoFocus
        />
        {/* Conditionally render submit button (only when user name has at least 1 character) */}
        {userName.length >= 1 && (
          <button type='submit' className={styles.button}>
            +
          </button>
        )}
      </form>
      <ErrorDisplay error={error} remWidth={20} />
    </div>
  );
};

export default CreateUser;