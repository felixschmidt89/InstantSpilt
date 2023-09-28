import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchGroupName = (groupCode) => {
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    async function fetchGroupName() {
      try {
        const response = await axios.get(`${apiUrl}/groups/${groupCode}`);
        const data = response.data.data;
        const groupName = data.groupName;
        setGroupName(groupName);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching group name:", error);
        }
      }
    }

    fetchGroupName();
  }, [groupCode]);

  return groupName;
};

export default useFetchGroupName;
