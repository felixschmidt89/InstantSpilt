// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";
import { genericErrorMessage } from "../../constants/errorConstants";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import UserTransactionsHistory from "../../components/features/UserTransactionsHistory/UserTransactionsHistory/UserTransactionsHistory";
import NoUserTransactions from "../../components/features/UserTransactionsHistory/NoUserTransactions/NoUserTransactions";

// Styles
import styles from "./UserTransactionHistoryPage.module.css";
import InAppNavigationBar from "../../components/common/InAppNavigationBar/InAppNavigationBar";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserTransactionHistoryPage = () => {
  const { userId } = useParams();
  const [userExpensesAndPayments, setUserExpensesAndPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to update state to trigger page rerender after resource deletion
  const updateUserExpensesAndPaymentsAfterResourceDeletion = (itemId) => {
    const updatedItems = userExpensesAndPayments.filter(
      (item) => item._id !== itemId
    );
    devLog("User expenses and payments updated:", updatedItems);
    setUserExpensesAndPayments(updatedItems);
  };

  useEffect(() => {
    const fetchUserExpensesAndPayments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/${userId}/expenses-and-payments`
        );
        devLog(`User ${userId} expenses and payments fetched:`, response);
        const userTransactionalData = response.data.userExpensesAndPayments;

        setUserExpensesAndPayments(userTransactionalData);
        setError(null);
        setIsLoading(false);
        console.log("userExpensesAndPayments:", userTransactionalData);
      } catch (error) {
        devLog("Error fetching user expenses and payments:", error);
        setError(genericErrorMessage);
        setIsLoading(false);
      }
    };

    fetchUserExpensesAndPayments();
  }, [userId]);
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - user history' />
      <PiratePx COUNT_IDENTIFIER={"user-transaction-history"} />
      <InAppNavigationBar back={true} backRoute='/instant-split' />

      <h1>Transaction history</h1>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.container}>
          {userExpensesAndPayments.length > 0 ? (
            <UserTransactionsHistory
              userExpensesAndPayments={userExpensesAndPayments}
              userId={userId}
              onDeleteResource={
                updateUserExpensesAndPaymentsAfterResourceDeletion
              }
            />
          ) : (
            <NoUserTransactions />
          )}
          <ErrorDisplay error={error} />
        </div>
      )}
    </main>
  );
};

export default UserTransactionHistoryPage;
