// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";

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
  const [noGroupMembers, setNoGroupMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

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
          setNoGroupMembers(false);
        } else {
          setNoGroupMembers(true);
        }
        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group users:", error);
        setError(t("generic-error-message"));
        displayErrorModal();
        setIsLoading(false);
      }
    };

    fetchUserDetails();
    // ESLint rule disabled because adding displayErrorModal to dependency array causes infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderTrigger, groupCode]);

  useEffect(() => {
    devLog("group members:", userDetails);
  }, [userDetails]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.membersContainer}>
          <h2 className={styles.groupMemberHeader}>
            {t("render-user-names-component-header")}
          </h2>
          <div className={styles.members}>
            {noGroupMembers ? (
              <span className={styles.noGroupMembers}>
                {t("render-user-names-component-no-group-members-added-copy")}
              </span>
            ) : (
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
