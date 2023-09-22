import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function ListGroups() {
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

        const groupCodesString = groupCodesArray.join(",");

        const response = await axios.get(
          `${apiUrl}/groups/listGroupNames?storedGroupCodes=${groupCodesString}`
        );

        const responseData = response.data;

        const names = responseData.groupNames.map((groupName) => groupName);
        setGroupNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "An error occurred while fetching groupNames. Please try again later."
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
}
