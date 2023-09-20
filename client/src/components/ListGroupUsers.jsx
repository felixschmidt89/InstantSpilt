import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function ListGroupUsers({ refreshData }) {
  const [userNames, setUserNames] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const groupId = localStorage.getItem('activeGroupId');
      const response = await axios.get(`${apiUrl}/users/byGroupId/${groupId}`);
      const responseData = response.data;
      const names = responseData.users.map((user) => user.userName);
      setUserNames(names);
    } catch (error) {
      console.log(
        'Unable to send GET to /users/byGroupId. Trying again in 1s...',
      );
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers, refreshData]);

  return (
    <ul style={{ listStyleType: 'none' }}>
      {userNames.map((userName) => (
        <li key={userName}>{userName}</li>
      ))}
    </ul>
  );
}
