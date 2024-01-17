// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Constants and Utils
import { genericErrorMessage } from "../../../../constants/errorConstants";
import { devLog } from "../../../../utils/errorUtils";
import {
  calculateAndAddUserBalance,
  filterUnsettledUsers,
  groupUsersPerPositiveOrNegativeUserBalance,
} from "../../../../utils/settlementUtils";

// Components
import UsersWithPositiveBalance from "../UsersWithPositiveBalance/UsersWithPositiveBalance";
import UsersWithNegativeBalance from "../UsersWithNegativeBalance/UsersWithNegativeBalance";
import Spinner from "../../../common/Spinner/Spinner";
import ExpensesSettled from "../ExpensesSettled/ExpensesSettled";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import RenderSettlementPaymentSuggestions from "../RenderSettlementPaymentSuggestions/RenderSettlementPaymentSuggestions";

// Styles
import styles from "./SettleExpenses.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component to settle expenses, identifying users with unsettled user balances.
 * @returns {JSX.Element} React component. */
const SettleExpenses = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  const [unsettledUsers, setUnsettledUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndIdentifyUnsettledUsers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const responseData = response.data;
        devLog("User details fetched:", response);

        if (responseData.users && responseData.users.length > 0) {
          // Calculate and add user balance property
          const userDetails = responseData.users.map((user) => {
            return calculateAndAddUserBalance(user);
          });
          const unsettledUserDetails = filterUnsettledUsers(userDetails);
          devLog("Unsettled users identified:", unsettledUserDetails);
          setUnsettledUsers(unsettledUserDetails);
        } else {
          setUnsettledUsers([]);
        }
        setIsLoading(false);
      } catch (error) {
        devLog(
          "Error fetching and identifying users with unsettled balances:",
          error
        );
        setError(genericErrorMessage);
        setIsLoading(false);
      }
    };

    fetchAndIdentifyUnsettledUsers();
  }, [groupCode]);

  const { positiveBalanceUsers, negativeBalanceUsers } =
    groupUsersPerPositiveOrNegativeUserBalance(unsettledUsers);

  return (
    <div>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div>
          {/* Check if there are users with unsettled balances */}
          {unsettledUsers.length !== 0 ? (
            <div className={styles.container}>
              <UsersWithNegativeBalance
                negativeBalanceUsers={negativeBalanceUsers}
              />
              <UsersWithPositiveBalance
                positiveBalanceUsers={positiveBalanceUsers}
              />
              <RenderSettlementPaymentSuggestions
                positiveBalanceUsers={positiveBalanceUsers}
                negativeBalanceUsers={negativeBalanceUsers}
              />
            </div>
          ) : (
            <ExpensesSettled />
          )}
        </div>
      )}
      <ErrorDisplay error={error} />
    </div>
  );
};
export default SettleExpenses;
