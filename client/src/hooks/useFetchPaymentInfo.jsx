import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useFetchPaymentInfo = (paymentId) => {
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    async function fetchPaymentInfo() {
      try {
        const response = await axios.get(`${apiUrl}/payments/${paymentId}`);
        const paymentData = response.data.data.payment;
        setPaymentInfo(paymentData);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching payment info:", error);
        }
      }
    }

    fetchPaymentInfo();
  }, [paymentId]);

  return paymentInfo;
};

export default useFetchPaymentInfo;
