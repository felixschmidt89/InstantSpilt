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
    <div className={styles.container}>
      <div className={styles.webshare}>
        {" "}
        <WebShareApiInvite
          groupCode={groupCode}
          groupName={groupName}
          initialGroupName={initialGroupName}
        />
      </div>

      <div className={styles.invitationLink}>
        Alternatively, copy and share the invitation link below to either invite
        peers to join <span className={styles.strong}>{groupName}</span> or to
        gain access on your other devices:
        <CopyToClipBoard infoToCopy={infoToCopy} inputFieldWidth={"25rem"} />
      </div>
    </div>
  );
};

export default ShareGroupInvitationIncludingWebShare;
