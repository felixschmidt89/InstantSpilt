// React and Third-Party Libraries
import React from "react";

// Components
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./ShareGroupInvitation.module.css";
/**
 * Renders option for sharing a group invitation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.infoToCopy - The information to be copied.
 * @returns {JSX.Element} React component. */
const ShareGroupInvitation = ({ groupName, infoToCopy }) => {
  return (
    <div className={styles.container}>
      <div className={styles.invitationLink}>
        Copy the link below to invite others to join{" "}
        <span className={styles.strong}>{groupName}:</span>
        <CopyToClipboard infoToCopy={infoToCopy} inputFieldWidth={"25rem"} />
      </div>
    </div>
  );
};

export default ShareGroupInvitation;
