// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
// Constants and Utils
import { devLog } from "../../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../../constants/errorConstants";
import { BALANCE_THRESHOLD } from "../../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../../hooks/useErrorModalVisibility";

// Components
import Spinner from "../../../../common/Spinner/Spinner";
import PiratePx from "../../../../common/PiratePx/PiratePx";
import NotEnoughUsers from "../../NotEnoughUsers/NotEnoughUsers";
import RenderUserNameAndBalance from "../RenderUserNameAndBalance/RenderUserNameAndBalance";
import ErrorModal from "../../../../common/ErrorModal/ErrorModal";

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

  const [userDetails, setUserDetails] = useState([]);
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
          const userDetails = responseData.users.map((user) => ({
            userId: user._id,
            userName: user.userName,
            userBalance:
              // Check if the absolute value of userBalance is less than or equal to the threshold
              Math.abs(user.userBalance) <= BALANCE_THRESHOLD
                ? 0 // If true, set userBalance to 0 to treat such edge cases as settled
                : +parseFloat(user.userBalance).toFixed(2), // round to 2 decimal places
          }));
          setUserDetails(userDetails);
          devLog("User details formatted:", userDetails);
        }
        setError("");
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching user details:", error);
        setError(genericErrorMessage);
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
    <div className={styles.balancesContainer}>
      {/* Check if there is at least 1 user */}
      {userDetails.length > 0 ? (
        <RenderUserNameAndBalance
          userDetails={userDetails}
          groupCode={groupCode}
          groupCurrency={groupCurrency}
        />
      ) : (
        <NotEnoughUsers />
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
