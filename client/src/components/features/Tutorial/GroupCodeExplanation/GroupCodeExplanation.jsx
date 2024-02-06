// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Components
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./GroupCodeExplanation.module.css";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

/**
 * Component for rendering explanation of the GroupCode for accessing a group and providing related information to store it.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} initialGroupName - The group name set during group creation.
 * @param {string} props.groupCode - The GroupCode for accessing the group.
 * @returns {JSX.Element} React component. */
const GroupCodeExplanation = ({ initialGroupName, groupCode }) => {
  // Force passing URL-encoded groupNames
  const urlEncodedGroupName = encodeURIComponent(initialGroupName);
  const invitationUrl = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <div className={styles.container}>
      <h2>retain access to group</h2>
      <p>
        All you need to access this group is your <strong>groupcode</strong>. So
        be sure to write it down in a safe place.
      </p>
      <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
      <p className={`${styles.invitationLink} ${styles.explanation}`}>
        Alternatively, bookmark the{" "}
        {/* Link to the invitation URL opening new tab */}
        <Link to={invitationUrl} target='_blank' rel='noopener noreferrer'>
          invitation link
        </Link>{" "}
        to avoid losing access to this group on this device. Also, be careful
        with the groupCode and the invitation link: Anyone with access to them
        can fully access your group.
      </p>
      <h2>sync access across devices</h2>
      <p className={styles.explanation}>
        If you've accessed a group on your phone, you won't automatically have
        access on your computer. To gain access to the same group on another
        device, you'll need to use the groupCode or invitation link specifically
        on that device. The same principle applies if you're using multiple
        browsers on the same device. For example, if you primarily use Chrome
        (as recommended by InstantSplit) but occasionally use Firefox, you'll
        need to use the groupCode or invitation link once to gain access to the
        group on Firefox.
      </p>
    </div>
  );
};

export default GroupCodeExplanation;
