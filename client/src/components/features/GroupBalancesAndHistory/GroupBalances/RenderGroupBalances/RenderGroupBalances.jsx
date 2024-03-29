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
          const groupMemberDetails = responseData.users.map((user) => ({
            userId: user._id,
            userName: user.userName,
            userBalance:
              // Check if the absolute value of userBalance is less than or equal to the threshold
              Math.abs(user.userBalance) <= BALANCE_THRESHOLD
                ? 0 // If true, set userBalance to 0 to treat such edge cases as settled
                : +parseFloat(user.userBalance).toFixed(2), // round to 2 decimal places
          }));
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
  // Display loading spinner while data is being fetched
  return isLoading ? (
    <div className={styles.spinner}>
      <Spinner />
    </div>
  ) : (
    <div className={styles.container}>
      {/* Check if there is at least 1 user */}
      {groupMemberDetails.length > 0 ? (
        <RenderGroupMemberBalance
          groupMemberDetails={groupMemberDetails}
          groupCode={groupCode}
          groupCurrency={groupCurrency}
        />
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
