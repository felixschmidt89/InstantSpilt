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
 * @param {string} props.groupCode - The code of the group.
 * @param {string} props.infoToCopy - The information to be copied. *
 * @returns {JSX.Element} React component. */
const ShareGroupInvitationIncludingWebShare = ({
  groupName,
  groupCode,
  infoToCopy,
  initialGroupName,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.webshare}>
        <WebShareApiInvite
          groupCode={groupCode}
          groupName={groupName}
          initialGroupName={initialGroupName}
        />
      </div>
      <h2 className={styles.orCopy}>{t("share-group-invitation-or")}</h2>
      <div className={styles.invitationLink}>
        {t("share-group-invitation-explanation", { groupName })}
        :
        <CopyToClipBoard infoToCopy={infoToCopy} inputFieldWidth={"15rem"} />
      </div>
    </div>
  );
};

export default ShareGroupInvitationIncludingWebShare;
