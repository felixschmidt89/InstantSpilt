import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function ListGroupUsers({ refreshData }) {
  const [userNames, setUserNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUsers() {
      try {
        const groupId = localStorage.getItem('activeGroupId');
        console.log(groupId);
        const response = await axios.get(
          `${apiUrl}/users/byGroupId/${groupId}`,
        );
        const responseData = response.data;
        const names = responseData.users.map((user) => user.userName);
        setUserNames(names);
        setError(null);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error fetching data:', error);
        }
        setError(
          'An error occurred while fetching data. Please try again later.',
        );
      }
    }

    getUsers();
  }, [refreshData]);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul style={{ listStyleType: 'none' }}>
        {userNames.map((userName) => (
          <li key={userName}>{userName}</li>
        ))}
      </ul>
    </div>
  );
}
