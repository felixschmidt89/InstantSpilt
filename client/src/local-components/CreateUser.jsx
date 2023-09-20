import React from 'react';
import { useState } from 'react';
import axios from 'axios';

/**
 * Form to create a new user
 */
export default function CreateUser() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [userName, setUserName] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupId = localStorage.getItem('activeGroupId');
      console.log(groupId);
      await axios.post(`${apiUrl}/users`, {
        userName,
        groupId: String(groupId),
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating user:', error);
      }
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div>
      <h2>Add a user</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="user name"
          required
          minLength="2"
          pattern=".*\S+.*"
          style={{ marginLeft: '10px' }}
        />
        {userName.length >= 3 && (
          <button type="submit" style={{ marginLeft: '10px', padding: '2px' }}>
            add
          </button>
        )}
      </form>
    </div>
  );
}
