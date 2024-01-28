// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Components
import Spinner from "../../../common/Spinner/Spinner";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./RenderUserNames.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Renders a list of all user names of a group.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rerenderTrigger - Trigger for re-rendering the component.
 * @param {string} props.groupCode - The groupCode of the group.
 * @returns {JSX.Element} React component. */
const RenderUserNames = ({ rerenderTrigger, groupCode }) => {
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  useEffect(() => {
    if (!groupCode) {
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const responseData = response.data;
        devLog("User details fetched:", response);
        // Check if there's at least 1 user
        if (responseData.users && responseData.users.length > 0) {
          // Extract usernames
          const userNames = responseData.users.map((user) => user.userName);
          setUserNames(userNames);
        }
        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group users:", error);
        setError(genericErrorMessage);
        displayErrorModal();
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [rerenderTrigger, groupCode]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        // Display the list of user names when data is loaded
        <ul className={styles.userList}>
          {userNames.map((userName) => (
            <li key={userName}>
              <div>
                <strong>{userName}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default RenderUserNames;
