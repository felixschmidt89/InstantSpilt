// DONE adding only meaningful necessary comments
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./CreateUserForm.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreateUserForm({ toggleDataRefresh }) {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const groupCode = localStorage.getItem("activeGroupCode");

  // On form submission: Provide groupCode for authentication, post unique user within group, clear form & trigger a parent component refresh
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/users`, {
        userName,
        groupCode,
      });
      setUserName("");
      toggleDataRefresh();
      setError("");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating user:", error);
      }
      // Render conflict status message if there is already a group member with same name
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        setError("Error creating user. Please try again.");
      }
    }
  };

  // controlled input component to set userName state
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  // render input field, conditionally render submit button and error message
  return (
    <div className={styles.container}>
      <h1>Add user</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={userName}
          onChange={handleUserNameChange}
          placeholder='user name'
          required
          minLength={1}
          maxLength={50}
          pattern='.*\S+.*'
          className={styles.inputField}
          ref={inputRef}
          autoFocus
        />
        {userName.length >= 1 && (
          <button type='submit' className={styles.button}>
            +
          </button>
        )}
      </form>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
