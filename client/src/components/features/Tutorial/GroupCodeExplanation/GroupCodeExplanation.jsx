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
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.groupCode - The GroupCode for accessing the group.
 * @returns {JSX.Element} React component. */
const GroupCodeExplanation = ({ groupName, groupCode }) => {
  // Force passing URL-encoded groupNames
  const urlEncodedGroupName = encodeURIComponent(groupName);
  const invitationUrl = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <>
      <div className={styles.container}>
        <h2>GroupCode</h2>
        <p>
          All you need to access this group is your <strong>Groupcode</strong>.
          So be sure to write it down in a safe place.
        </p>
        <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
        <p>
          Alternatively, bookmark the{" "}
          {/* Link to the invitation URL opening new tab */}
          <Link to={invitationUrl} target='_blank' rel='noopener noreferrer'>
            invitation link
          </Link>{" "}
          to avoid losing access to this group on this device.
        </p>
      </div>
    </>
  );
};

export default GroupCodeExplanation;
