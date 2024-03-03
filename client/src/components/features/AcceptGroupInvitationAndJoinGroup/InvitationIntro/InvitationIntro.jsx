// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InvitationIntro.module.css";

/**
 * Component to introduce users to InstantSplit when they receive an invitation.
 *
 * @param {Object} props - React props.
 * @param {Object} props.groupData - groupData
 * @returns {JSX.Element} React component. */

const InvitationIntro = ({ groupData }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <p>
        {t("invitation-intro-copy", { groupName: groupData.group.groupName })}
      </p>
    </div>
  );
};

export default InvitationIntro;
