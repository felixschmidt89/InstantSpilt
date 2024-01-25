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
    <div className={styles.WebShare}>
      <p>
        To invite others to join <strong>{groupName}</strong> or to access
        InstantSplit on your other devices, you can use WebShare:
      </p>
      <WebShareApiInvite
        groupCode={groupCode}
        groupName={groupName}
        initialGroupName={initialGroupName}
      />
      <p>
        Or, simply copy and share this link:
        <CopyToClipBoard infoToCopy={infoToCopy} />
      </p>
    </div>
  );
};

export default ShareGroupInvitationIncludingWebShare;
