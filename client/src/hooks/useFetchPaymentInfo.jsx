import { useState, useEffect } from "react";
import axios from "axios";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching payment information.
 *
 * @param {string} paymentId - The ID of the payment to fetch.
 * @returns {Object} An object containing payment information and potential error.
 * @property {Object|null} paymentInfo - The fetched payment information.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchPaymentInfo = (paymentId) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/payments/${paymentId}`);
        const paymentData = response.data.payment;
        devLog("Payment info fetched:", response);
        setPaymentInfo(paymentData);
      } catch (error) {
        devLog("Error fetching payment info:", error);
        setError(
          "An error occurred while fetching payment info. Please try again later."
        );
      }
    };

    fetchPaymentInfo();
  }, [paymentId]);

  return { paymentInfo, error };
};

export default useFetchPaymentInfo;
