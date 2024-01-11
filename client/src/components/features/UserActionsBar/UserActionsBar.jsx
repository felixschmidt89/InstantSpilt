// React and Third-Party Libraries
import React from "react";
import {
  faRightFromBracket,
  faUserPlus,
  faMessage,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
// Components
import NavigateFontAwesomeIcon from "../../common/NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";

// Styles
import styles from "./UserActionsBar.module.css";

/**
 * Component for rendering a bar with user-related actions icons:
 * - Invite users
 * - Send feedback
 * - View tutorial
 * - Delete groupCode from the device
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.groupCode
 * @param {string} props.groupName
 * @returns {JSX.Element} - UserActionsBar component
 */
const UserActionsBar = ({ groupCode, groupName }) => {
  return (
    <div className={styles.container}>
      <NavigateFontAwesomeIcon
        icon={faUserPlus}
        route={`/share-group/${groupName}/${groupCode}`}
        tooltip='Invite & share group'
      />
      <NavigateFontAwesomeIcon
        icon={faMessage}
        route={`/feedback/${groupCode}`}
        tooltip='Feedback'
      />
      <NavigateFontAwesomeIcon
        icon={faCircleQuestion}
        route={`/tutorial/${groupName}/${groupCode}`}
        tooltip='Tutorial'
      />
      <NavigateFontAwesomeIcon
        icon={faRightFromBracket}
        route={`/leave-group/${groupName}/${groupCode}`}
        tooltip='Leave group'
      />
    </div>
  );
};

export default UserActionsBar;
