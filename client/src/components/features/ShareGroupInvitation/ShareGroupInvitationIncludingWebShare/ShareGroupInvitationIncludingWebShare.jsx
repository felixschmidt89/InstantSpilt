// React and Third-Party Libraries
import React from "react";

// Components
import CopyToClipBoard from "../../../common/CopyToClipboard/CopyToClipboard";
import WebShareApiInvite from "../WebShareApiInvite/WebShareApiInvite";

// Styles
import styles from "./ShareGroupInvitationIncludingWebShare.module.css";

/**
 * Renders options for sharing group invitation - including WebShare API.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} initialGroupName - The group name set during group creation.
 * @param {string} props.groupCode - The code of the group.
 * @param {string} props.infoToCopy - The information to be copied. *
 * @returns {JSX.Element} React component. */
const ShareGroupInvitationIncludingWebShare = ({
  groupName,
  groupCode,
  infoToCopy,
  initialGroupName,
}) => {
  return (
    <ul className={styles.container}>
      <li className={styles.webshare}>
        Invite others to join or access {groupName} on your other devices:{" "}
        <WebShareApiInvite
          groupCode={groupCode}
          groupName={groupName}
          initialGroupName={initialGroupName}
        />
      </li>
      <li>
        Or copy and share this invitation link:
        <CopyToClipBoard infoToCopy={infoToCopy} />
      </li>
    </ul>
  );
};

export default ShareGroupInvitationIncludingWebShare;
