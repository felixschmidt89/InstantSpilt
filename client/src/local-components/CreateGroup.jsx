import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function CreateGroup() {
  //   const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const apiUrl = 'http://localhost:3000/api/v1/groups';

  const [groupName, setGroupName] = useState('');

  const handleFormSubmit = async (e) => {
    console.log('button clicked');
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}`, {
        groupName,
      });
      console.log('Response from server:', response.data);
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
