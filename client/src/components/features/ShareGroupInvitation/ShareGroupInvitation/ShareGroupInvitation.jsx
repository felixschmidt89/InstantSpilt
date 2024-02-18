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
        Copy and share the invitation link below to either invite peers to join{" "}
        <strong>{groupName}</strong> or to gain access on your other devices:
      </p>
      <CopyToClipboard inputFieldWidth={200} infoToCopy={infoToCopy} />
    </div>
  );
};

export default ShareGroupInvitation;
