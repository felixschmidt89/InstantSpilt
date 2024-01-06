import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchExpenseInfo = (expenseId) => {
  const [expenseInfo, setExpenseInfo] = useState(null);

  useEffect(() => {
    async function fetchExpenseInfo() {
      try {
        const response = await axios.get(`${apiUrl}/expenses/${expenseId}`);
        const expenseData = response.data.data.expense;
        setExpenseInfo(expenseData);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching expense info:", error);
        }
      }
    }

    fetchExpenseInfo();
  }, [expenseId]);

  return expenseInfo;
};

export default useFetchExpenseInfo;
