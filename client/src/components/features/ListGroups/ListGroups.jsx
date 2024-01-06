import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ListGroups = () => {
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getGroups() {
      try {
        const groupCodesArray = JSON.parse(
          localStorage.getItem("storedGroupCodes")
        );

        if (!groupCodesArray) {
          return;
        }
        // Convert the group codes array to a string
        const groupCodesString = groupCodesArray.join(",");

        const response = await axios.get(
          `${apiUrl}/groups/StoredGroupNames?storedGroupCodes=${groupCodesString}`
        );

        const names = response.data.data.groupNames.map(
          (groupName) => groupName
        );
        setGroupNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "An error occurred while fetching group names. Please try again later."
        );
      }
    }

    getGroups();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul style={{ listStyleType: "none" }}>
        {groupNames.map((groupName) => (
          <li key={groupName}>{groupName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroups;
