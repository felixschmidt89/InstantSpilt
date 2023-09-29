import React, { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreateUser({ toggleDataRefresh }) {
  const [userName, setUserName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // provide groupCode for authentication
      const groupCode = localStorage.getItem("activeGroupCode");
      await axios.post(`${apiUrl}/users`, {
        userName,
        groupCode,
      });
      setUserName("");
      // update parent state to trigger userList rerender
      toggleDataRefresh();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating user:", error);
      }
    }
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div>
      <h2>Add user</h2>
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
          style={{ marginLeft: "10px" }}
        />
        {userName.length >= 3 && (
          <button type='submit' style={{ marginLeft: "10px", padding: "2px" }}>
            add
          </button>
        )}
      </form>
    </div>
  );
}
