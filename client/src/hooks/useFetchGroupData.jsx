import { useState, useEffect } from "react";
import axios from "axios";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchGroupData = (groupCode) => {
  const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/groups/${groupCode}`);
        const fetchedGroupData = response.data;
        devLog("GroupData fetched:", response);
        setGroupData(fetchedGroupData);
      } catch (error) {
        devLog("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, [groupCode]);

  return groupData;
};

export default useFetchGroupData;
