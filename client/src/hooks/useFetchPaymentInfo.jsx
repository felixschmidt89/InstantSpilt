// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching payment information.
 *
 * @param {string} paymentId - The ID of the payment to fetch.
 * @returns {Object} An object containing payment information and potential error.
 * @property {Object|null} paymentInfo - The fetched payment information.
 *  @property {boolean} isFetched - Indicates whether the payment info has been successfully fetched.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchPaymentInfo = (paymentId) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/payments/${paymentId}`);
        const paymentData = response.data.payment;
        devLog("Payment info fetched:", response);
        setPaymentInfo(paymentData);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching payment info:", error);
        setError(genericErrorMessage);
      }
    };

    fetchPaymentInfo();
  }, [paymentId]);

  return { paymentInfo, isFetched, error };
};

export default useFetchPaymentInfo;
