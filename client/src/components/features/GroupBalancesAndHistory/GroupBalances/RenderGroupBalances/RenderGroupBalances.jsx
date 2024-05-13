// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../../utils/errorUtils";
import { BALANCE_THRESHOLD } from "../../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../../hooks/useErrorModalVisibility";

// Components
import Spinner from "../../../../common/Spinner/Spinner";
import PiratePx from "../../../../common/PiratePx/PiratePx";
import NotEnoughGroupMembers from "../../NotEnoughGroupMembers/NotEnoughGroupMembers";
import ErrorModal from "../../../../common/ErrorModal/ErrorModal";
import RenderGroupMemberBalance from "../RenderGroupMemberBalance/RenderGroupMemberBalance";

// Styles
import styles from "./RenderGroupBalances.module.css";
import RenderGroupExpensesTotal from "../RenderTotalGroupExpenses/RenderGroupExpensesTotal";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Displays group members' balances, handles data fetching, formatting and rendering
 *
 * @returns {JSX.Element} React component. */
const RenderGroupBalances = ({ groupCurrency }) => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { t } = useTranslation();
  const [groupMemberDetails, setGroupMemberDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  // Define fetch user details function, extract & format relevant data, then set the user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const responseData = response.data;
        devLog("User details fetched:", response);

        // Format fetched user data
        if (responseData.users && responseData.users.length > 0) {
          const groupMemberDetails = responseData.users.map((user) => {
            // Check if all group members have user balances within the threshold, if so, render accurate user balance.
            const isNoEdgeCase =
              responseData.users.length > 1 &&
              responseData.users.every(
                (u) => Math.abs(u.userBalance) <= BALANCE_THRESHOLD
              ) &&
              Math.abs(user.userBalance) <=
                (responseData.users.length - 1) * BALANCE_THRESHOLD;
            devLog("isNoEdgeCase:", isNoEdgeCase);

            return {
              userId: user._id,
              userName: user.userName,
              userBalance:
                // if user balance is within the threshold and it's no edge case, set it to 0 to avoid rounding errors (e.g. 10.00 split among 3 group members)
                Math.abs(user.userBalance) <= BALANCE_THRESHOLD && isNoEdgeCase
                  ? 0
                  : +parseFloat(user.userBalance).toFixed(2),
            };
          });

          setGroupMemberDetails(groupMemberDetails);
          devLog("Group details formatted:", groupMemberDetails);
        }

        setError("");
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching user details:", error);
        setError(t("generic-error-message"));
        displayErrorModal();
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [groupCode]);

  return isLoading ? (
    <div className={styles.spinner}>
      <Spinner />
    </div>
  ) : (
    <div className={styles.container}>
      {/* Check if there is at least 1 user */}
      {groupMemberDetails.length > 0 ? (
        <>
          <RenderGroupMemberBalance
            groupMemberDetails={groupMemberDetails}
            groupCode={groupCode}
            groupCurrency={groupCurrency}
          />
          <RenderGroupExpensesTotal
            groupCode={groupCode}
            groupCurrency={groupCurrency}
          />
        </>
      ) : (
        <span className={styles.issue}>
          <NotEnoughGroupMembers />
        </span>
      )}
      <PiratePx COUNT_IDENTIFIER={"group-balances"} />
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default RenderGroupBalances;
