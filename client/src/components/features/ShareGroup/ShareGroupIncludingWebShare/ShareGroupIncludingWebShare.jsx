// React and Third-Party Libraries
import React from "react";

// Components
import CopyToClipBoard from "../../../common/CopyToClipboard/CopyToClipboard";
import WebShareApiInvite from "../../../common/WebShareApiInvite/WebShareApiInvite";

// Styles
import styles from "./ShareGroupIncludingWebShare.module.css";

/**
 * Renders options for sharing group invitation - including WebShare API.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.groupCode - The code of the group.
 * @param {string} props.infoToCopy - The information to be copied.
 * @returns {JSX.Element} - Rendered component.
 */
const ShareGroupIncludingWebShare = ({ groupName, groupCode, infoToCopy }) => {
  return (
    <div className={styles.WebShare}>
      <p>
        To invite others to join <strong>{groupName}</strong> or to access
        InstantSplit on your other devices, you can use WebShare:
      </p>
      <WebShareApiInvite groupCode={groupCode} groupName={groupName} />
      <p>
        Or, simply copy and share this link:
        <CopyToClipBoard infoToCopy={infoToCopy} />
      </p>
    </div>
  );
};

export default ShareGroupIncludingWebShare;
