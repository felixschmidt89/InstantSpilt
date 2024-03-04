// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./ShareGroupInvitation.module.css";
/**
 * Renders option for sharing a group invitation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.infoToCopy - The information to be copied.
 * @returns {JSX.Element} React component. */
const ShareGroupInvitation = ({ groupName, infoToCopy }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.invitationLink}>
        {t("share-group-invitation-explanation", { groupName })}
        :
        <CopyToClipboard infoToCopy={infoToCopy} inputFieldWidth={"25rem"} />
      </div>
    </div>
  );
};

export default ShareGroupInvitation;
