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
      <h2>groupCode</h2>
      <p className={styles.explanation}>
        InstantSplit is centered around the <strong>groupcode</strong>. You can
        access a group by entering the code manually or automatically using the
        invitation link. Be sure to store this group's code somewhere save:
      </p>
      <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
      <p className={`${styles.invitationLink} ${styles.explanation}`}>
        Alternatively, bookmark this group's{" "}
        {/* Link to the invitation URL opening new tab */}
        <Link to={invitationUrl} target='_blank' rel='noopener noreferrer'>
          invitation link
        </Link>{" "}
        to avoid losing access.
      </p>
    </div>
  );
};

export default GroupCodeExplanation;
