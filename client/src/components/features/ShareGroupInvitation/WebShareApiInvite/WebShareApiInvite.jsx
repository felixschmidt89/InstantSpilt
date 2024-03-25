// React and Third-Party Libraries
import React from "react";
import { PiUserPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Components
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./WebShareApiInvite.module.css";

/**
 * WebShareApiInvite component for inviting users to join the group via the Web Share API.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.invitationLink - The group's invitation link.
 * @returns {JSX.Element} React component.
 */
const WebShareApiInvite = ({ groupName, invitationLink }) => {
  const { t } = useTranslation();
  const title = t("web-share-api-invite-title", { groupName });
  const text = t("web-share-api-invite-text", { groupName });
  const url = invitationLink;

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
        devLog("Invite shared successfully via WebShareApi.");
      }
    } catch (error) {
      devLog("Error sharing invite via WebShareApi:", error);
    }
  };

  return (
    <span className={styles.icon} onClick={handleShareClick}>
      <ReactIconNavigate
        icon={PiUserPlus}
        containerHeight='8'
        containerWidth='7.2'
        iconExplanationWidth='5'
        explanationText={t("main-bar-invite-icon-text")}
        iconExplanationTextAlignment='center'
        iconExplanationIsIdleTranslateX='0.3'
        onClick={handleShareClick}
        iconSize={3.5}
        translateY={0.2}
        translateX={0.5}
        iconScale={1}
      />
    </span>
  );
};

export default WebShareApiInvite;
