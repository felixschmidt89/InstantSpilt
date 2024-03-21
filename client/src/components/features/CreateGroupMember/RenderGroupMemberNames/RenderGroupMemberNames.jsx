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
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import Emoji from "../../../common/Emoji/Emoji";
import DeleteGroupMemberBin from "../DeleteGroupMemberBin/DeleteGroupMemberBin";

// Styles
import styles from "./RenderGroupMemberNames.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Renders a list of all member names of a group including ability to delete them.
 *
 * @param {Object} props - The component props.
 * @param {number} props.rerenderTrigger - Trigger for re-rendering the component.
 * @param {string} props.groupCode - The groupCode of the group.
 * @param {Function} props.incrementRerenderTrigger - Function to increment the rerender trigger.
 * @returns {JSX.Element} React component.
 */
const RenderGroupMemberNames = ({
  rerenderTrigger,
  groupCode,
  incrementRerenderTrigger,
}) => {
  const [groupMemberDetails, setGroupMemberDetails] = useState([]);
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
          setGroupMemberDetails(sortedUserDetails);
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
    devLog("group members:", groupMemberDetails);
  }, [groupMemberDetails]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.membersContainer}>
          <h2 className={styles.groupMemberHeader}>
            {t("render-groupmember-names-component-header")}
          </h2>
          <div className={styles.members}>
            {noGroupMembers ? (
              <span className={styles.noGroupMembers}>
                {t("render-groupmember-names-component-no-group-members-copy")}
              </span>
            ) : (
              <ul className={styles.list}>
                {groupMemberDetails.map(({ _id, userName }, index) => (
                  <li key={index} className={styles.listItem}>
                    <span className={styles.emoji}>
                      <Emoji
                        emoji={emojiConstants.member}
                        label='group member emoji'
                      />
                    </span>
                    <span className={styles.groupMemberName}>{userName}</span>
                    <span className={styles.button}>
                      <DeleteGroupMemberBin
                        userId={_id}
                        groupMemberName={userName}
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

export default RenderGroupMemberNames;
