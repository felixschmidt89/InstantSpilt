// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import Spinner from "../../../common/Spinner/Spinner";
import DeleteUserBin from "../DeleteUserBin/DeleteUserBin";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderUserNames.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Renders a list of all member names of a group including ability to delete each user.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rerenderTrigger - Trigger for re-rendering the component.
 * @param {string} props.groupCode - The groupCode of the group.
 * @param {Function} props.incrementRerenderTrigger - Function to increment the rerender trigger.
 * @returns {JSX.Element} React component.
 */
const RenderUserNames = ({
  rerenderTrigger,
  groupCode,
  incrementRerenderTrigger,
}) => {
  const [userDetails, setUserDetails] = useState([]);
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
        if (responseData.users && responseData.users.length > 0) {
          // Render users in descending order of creation date
          const sortedUserDetails = responseData.users.sort(
            (userA, userB) =>
              new Date(userB.createdAt) - new Date(userA.createdAt)
          );
          setUserDetails(sortedUserDetails);
        }
        devLog(userDetails);
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
    // ESLint rule disabled because adding displayErrorModal to dependency array causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderTrigger, groupCode]);

  return (
    <div className={styles.spinnercontainer}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.membersContainer}>
          <h2 className={styles.groupMemberHeader}>group members</h2>
          <div className={styles.members}>
            {userDetails.length > 0 ? (
              <ul className={styles.list}>
                {userDetails.map(({ _id, userName }, index) => (
                  <li key={index} className={styles.listItem}>
                    <span className={styles.emoji}>
                      <Emoji
                        emoji={emojiConstants.user}
                        label='group member emoji'
                      />
                    </span>
                    <span className={styles.userName}>{userName}</span>
                    <span className={styles.button}>
                      <DeleteUserBin
                        userId={_id}
                        userName={userName}
                        incrementRerenderTrigger={incrementRerenderTrigger}
                        rerenderTrigger={rerenderTrigger}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              "No group members yet. Please add some."
            )}
          </div>
        </div>
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
