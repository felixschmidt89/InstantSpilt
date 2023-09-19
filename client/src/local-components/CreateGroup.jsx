import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function CreateGroup() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const [groupName, setGroupName] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}`, {
        groupName,
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating group:', error);
      }
    }
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  return (
    <div>
      <h1>Create a Group</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Enter group name
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </label>
        <button type="submit">Create group</button>
      </form>
    </div>
  );
}
