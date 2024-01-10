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
import UserTransactionsHistory from "../../components/features/UserDetails/UserTransactionsHistory/UserTransactionsHistory/UserTransactionsHistory";

// Styles
import styles from "./UserHistoryPage.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UserHistoryPage = () => {
  const { userId } = useParams();

  const [userExpensesAndPayments, setUserExpensesAndPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to update state after item deletion
  const handleDeleteItem = (itemId) => {
    const updatedItems = userExpensesAndPayments.filter(
      (item) => item.itemId !== itemId
    );
    setUserExpensesAndPayments(updatedItems);
  };

  useEffect(() => {
    const fetchUserExpensesAndPayments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/${userId}/expenses-and-payments`
        );
        devLog(`User ${userId} expenses and payments fetched:`, response);
        const responseData = response.data;

        // Check if userExpensesAndPayments array exists and has items
        if (
          responseData.userExpensesAndPayments &&
          responseData.userExpensesAndPayments.length > 0
        ) {
          // Create new properties and sort by createdAt in descending order
          const modifiedData = responseData.userExpensesAndPayments
            .map((item) => ({
              ...item,
              itemId: item._id,

              // Determine and add 'itemType' based on the presence of properties
              itemType: item.expenseDescription
                ? "expense"
                : item.paymentAmount
                ? "payment"
                : "unknown",

              // Convert createdAt to a Date object, sort by descending order
              createdAt: new Date(item.createdAt),
            }))
            .sort((a, b) => b.createdAt - a.createdAt);
          setUserExpensesAndPayments(modifiedData);
        }
        setError(null);
        setIsLoading(false);
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
      <PiratePx COUNT_IDENTIFIER={"user-history"} />
      <NavigateButton
        route={`user-page/${userId}`}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h1>User history</h1>
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
              onDeleteItem={handleDeleteItem}
            />
          ) : (
            <p className={styles.noTransactions}>
              No associated expenses or payments.
            </p>
          )}
          <ErrorDisplay error={error} />
        </div>
      )}
    </main>
  );
};

export default UserHistoryPage;
