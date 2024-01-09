// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
// Constants and Utils
import { devLog } from "../utils/errorUtils";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchGroupMembers = (groupCode) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const userData = response.data.users;
        const userNames = userData.map((user) => user.userName);
        devLog("Group members fetched:", response);
        setGroupMembers(userNames);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group members:", error);
      }
    };

    fetchGroupMembers();
  }, [groupCode]);

  return { groupMembers, isFetched };
};

export default useFetchGroupMembers;
