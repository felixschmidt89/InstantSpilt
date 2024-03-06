// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

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
 * @param {string} props.invitationLinkDE - German meta tags invitation link.
 *  @param {string} props.invitationLinkEN - English meta tags invitation link.
 * @returns {JSX.Element} React component. */
const ShareGroupInvitationIncludingWebShare = ({
  groupName,
  invitationLinkDE,
  invitationLinkEN,
  initialGroupName,
}) => {
  const { t, i18n } = useTranslation();

  // Check language locale
  const isGerman = i18n.language === "de";

  // Determine the appropriate invitation link
  const invitationLink = isGerman ? invitationLinkDE : invitationLinkEN;

  return (
    <div className={styles.container}>
      <div className={styles.webshare}>
        <WebShareApiInvite
          groupName={groupName}
          invitationLink={invitationLink}
        />
      </div>
      <h2 className={styles.orCopy}>{t("share-group-invitation-or")}</h2>
      <div className={styles.invitationLink}>
        {t("share-group-invitation-explanation", { groupName })}:
        <CopyToClipBoard
          infoToCopy={invitationLink}
          inputFieldWidth={"15rem"}
        />
      </div>
    </div>
  );
};

export default ShareGroupInvitationIncludingWebShare;
