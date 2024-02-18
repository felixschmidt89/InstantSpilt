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
      <div className={styles.explanation}>
        <div>
          Key to this group is its unique groupcode, store it somewhere save:
        </div>
        <div className={styles.groupCode}>
          <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"8.5rem"} />
        </div>
        <div className={styles.invitationLink}>
          Alternatively, bookmark its{" "}
          <strong>
            <Link to={invitationUrl} target='_blank' rel='noopener noreferrer'>
              invitation link.
            </Link>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default GroupCodeExplanation;
