// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  // Force passing URL-encoded groupNames
  const urlEncodedGroupName = encodeURIComponent(initialGroupName);
  const invitationUrl = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <div className={styles.container}>
      <h2>{t("groupcode-explanation-header")}</h2>
      <ul className={styles.list}>
        <li className={styles.groupCodeExplanation}>
          {t("groupcode-explanation-copy-1")}
          <span className={styles.copyButton}>
            <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"15rem"} />
          </span>
        </li>
        <li className={styles.invitationLink}>
          {t("groupcode-explanation-copy-2")}{" "}
          <Link to={invitationUrl} target='_blank' rel='noopener noreferrer'>
            {t("groupcode-explanation-invitation-link-text")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GroupCodeExplanation;
