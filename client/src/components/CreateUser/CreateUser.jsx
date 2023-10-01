import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateUser.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreateUser({ toggleDataRefresh }) {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Provide groupCode for authentication
      const groupCode = localStorage.getItem("activeGroupCode");
      await axios.post(`${apiUrl}/users`, {
        userName,
        groupCode,
      });
      setUserName("");
      // Update parent state to trigger userList rerender
      toggleDataRefresh();
      setError(""); // Clear previous errors
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating user:", error);
      }
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        setError("Error creating user. Please try again.");
      }
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

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
