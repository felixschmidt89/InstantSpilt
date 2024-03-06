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
 * @param {string} props.invitationLinkDE - German meta tags invitation link.
 *  @param {string} props.invitationLinkEN - English meta tags invitation link. * @returns {JSX.Element} React component. */
const ShareGroupInvitation = ({
  groupName,
  invitationLinkDE,
  invitationLinkEN,
}) => {
  const { t, i18n } = useTranslation();

  // Check language locale
  const isGerman = i18n.language === "de";

  // Determine the appropriate invitation link
  const invitationLink = isGerman ? invitationLinkDE : invitationLinkEN;

  return (
    <div className={styles.container}>
      <div className={styles.invitationLink}>
        {t("share-group-invitation-explanation", { groupName })}
        :
        <CopyToClipboard
          infoToCopy={invitationLink}
          inputFieldWidth={"25rem"}
        />
      </div>
    </div>
  );
};

export default ShareGroupInvitation;
