// React and Third-Party Libraries
import React, { useEffect, useRef, useState } from "react";
import { LuMenu } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { isWebShareAPISupported } from "../../../../utils/clientUtils";
import { addUserReactIconStyles } from "../../../../constants/stylesConstants";

// Hooks
import useFetchGroupData from "../../../../hooks/useFetchGroupData";
import useIsSlimDevice from "../../../../hooks/useIsSlimDevice";

// Components
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import InstantSplitLogo from "../../../common/InstantSplitLogo/InstantSplitLogo";
import WebShareApiInvite from "../../ShareGroupInvitation/WebShareApiInvite/WebShareApiInvite";

// Styles
import styles from "./DefaultAndUserSettingsBar.module.css";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

/**
 * React component for the default and user settings bar.
 * This component displays the top bar with various icons and settings for the user.
 * @component
 * @returns {JSX.Element} React component
 */
const DefaultAndUserSettingsBar = () => {
  const containerRef = useRef(null);
  const { t, i18n } = useTranslation();
  const groupCode = localStorage.getItem("activeGroupCode");
  const supportsWebShareAPI = isWebShareAPISupported();
  const isSlimDevice = useIsSlimDevice();
  const [isDefaultBarShown, setIsDefaultBarShown] = useState(true);
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  const showUserSettings = () => {
    setIsDefaultBarShown(false);
  };

  const hideUserSettings = () => {
    setIsDefaultBarShown(true);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsDefaultBarShown(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isFetched && groupData && groupData.group) {
      setIsDefaultBarShown(true);
    }
  }, [isFetched, groupData]);

  // Making sure that page is not rendered prior to successful data fetching while also not breaking the design
  if (!isFetched) {
    return <div></div>;
  }

  // Force URL-encoded initial groupName
  const urlEncodedGroupName = encodeURIComponent(
    groupData.group.initialGroupName
  );

  const invitationLinkDE = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;
  const invitationLinkEN = `${baseUrl}/join-en-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  // Check language locale
  const isGerman = i18n.language === "de";

  // Determine the appropriate invitation link
  const invitationLink = isGerman ? invitationLinkDE : invitationLinkEN;

  return (
    <div
      className={styles.container}
      role='toolbar'
      aria-label='top bar'
      ref={containerRef}>
      {!groupCode ? (
        <span className={styles.spinner}></span>
      ) : (
        <div className={styles.topBarWrapper}>
          {groupCode && groupData && groupData.group && (
            <span
              className={`${styles.userSettingsBar} ${!isDefaultBarShown ? styles.hideUserSettingsBar : styles.showUserSettingsBar}`}
              role='toolbar'
              aria-label='user settings'>
              <span className={styles.icon}>
                {supportsWebShareAPI ? (
                  <WebShareApiInvite
                    groupName={groupData.group.groupName}
                    invitationLink={invitationLink}
                  />
                ) : (
                  <ReactIconNavigate
                    explanationText={t("main-bar-invite-icon-text")}
                    icon={IoAddCircleOutline}
                    route={`/share-group/${groupData.group.initialGroupName}/${groupCode}`}
                    {...addUserReactIconStyles}
                  />
                )}
              </span>
              <span className={styles.instantSplitLogo}>
                <InstantSplitLogo width={"24"} />
              </span>
              <span className={styles.icon}>
                <ReactIconNavigate
                  icon={LuMenu}
                  containerHeight='8'
                  containerWidth='7.2'
                  iconSize={3.5}
                  iconScale={1.1}
                  translateY={0.15}
                  translateX={isSlimDevice ? 0.5 : -0.3}
                  iconExplanationWidth={5}
                  iconExplanationTextAlignment='center'
                  iconExplanationIsIdleTranslateX={isSlimDevice ? 0.5 : -0.3}
                  explanationText={t("main-bar-more-icon-text")}
                  onClick={showUserSettings}
                />
              </span>
            </span>
          )}
          <span
            className={`${styles.userSettingsBar} ${!isDefaultBarShown ? styles.hideUserSettingsBar : styles.showUserSettingsBar}`}
            role='toolbar'
            aria-label='user settings'>
            <ReactIconNavigate
              icon={IoArrowBackCircleOutline}
              containerHeight='8'
              containerWidth='8'
              explanationText={t("main-bar-back-icon-text")}
              iconSize={3.5}
              iconScale={1.05}
              onClick={hideUserSettings}
            />

            <ReactIconNavigate
              icon={IoInformationCircleOutline}
              containerHeight='8'
              containerWidth='8'
              explanationText={t("main-bar-tutorial-icon-text")}
              route={`/tutorial/${groupData?.group?.initialGroupName}/${groupCode}`}
              iconSize={3.5}
              iconScale={1.1}
              translateY={0.1}
            />
            <ReactIconNavigate
              icon={IoChatboxOutline}
              containerHeight='8'
              containerWidth='8'
              explanationText={t("main-bar-contact-icon-text")}
              route={`/contact/${groupCode}`}
              iconSize={3.5}
              iconScale={0.95}
            />
            <ReactIconNavigate
              icon={PiUserSwitchLight}
              containerHeight='8'
              containerWidth='8'
              explanationText={t("main-bar-manage-groups-icon-text")}
              iconExplanationWidth='9'
              route={`/manage-groups`}
              iconSize={3.5}
              iconScale={1}
              translateY={0.1}
            />
            <ReactIconNavigate
              icon={IoEnterOutline}
              containerHeight='8'
              containerWidth='8'
              iconExplanationWidth='6'
              explanationText={t("main-bar-leave-group-icon-text")}
              route={`/leave-group/${groupData?.group?.groupName}/${groupCode}`}
              iconSize={3.5}
              iconScale={1.1}
              translateX={-0.3}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default DefaultAndUserSettingsBar;
