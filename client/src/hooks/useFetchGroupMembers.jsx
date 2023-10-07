import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchGroupMembers = (groupCode) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    async function fetchGroupMembers() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const userData = response.data.data.users;
        const userNames = userData.map((user) => user.userName);
        setGroupMembers(userNames);
        setIsFetched(true);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching group members:", error);
        }
      }
    }

    fetchGroupMembers();
  }, [groupCode]);

  return { groupMembers, isFetched };
};

export default useFetchGroupMembers;
