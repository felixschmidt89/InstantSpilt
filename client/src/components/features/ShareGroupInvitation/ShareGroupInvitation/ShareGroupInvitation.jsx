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
      <p>
        Invite peers to join or access {groupName} on your other devices via the
        invitation link:
      </p>
      <CopyToClipboard inputFieldWidth={200} infoToCopy={infoToCopy} />
    </div>
  );
};

export default ShareGroupInvitation;
