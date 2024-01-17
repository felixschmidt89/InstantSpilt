// React and Third-Party Libraries
import React from "react";
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";

// Components

/**
 * Renders option for sharing a group invitation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.infoToCopy - The information to be copied.
 * @returns {JSX.Element} React component. */
const ShareGroup = ({ groupName, infoToCopy }) => {
  return (
    <p>
      To invite others to join <strong>{groupName}</strong> or to access
      InstantSplit on your other devices, simply copy and share this link:
      <CopyToClipboard infoToCopy={infoToCopy} />
    </p>
  );
};

export default ShareGroup;
