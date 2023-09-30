import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const userData = response.data.data.user;
        setUserInfo(userData);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching user info:", error);
        }
      }
    }

    fetchUserInfo();
  }, [userId]);

  return userInfo;
};

export default useFetchUserInfo;
