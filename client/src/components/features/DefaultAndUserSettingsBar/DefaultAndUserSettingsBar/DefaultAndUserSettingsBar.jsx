// React and Third-Party Libraries
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { PiUserPlus } from "react-icons/pi";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { deleteGroupDataFromLocalStorage } from "../../../../utils/localStorageUtils";

// Hooks
import useValidateGroupExistence from "../../../../hooks/useValidateGroupCodeExistence";
import useFetchGroupData from "../../../../hooks/useFetchGroupData";
import useIsSlimDevice from "../../../../hooks/useIsSlimDevice";

// Components
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import InstantSplitLogo from "../../../common/InstantSplitLogo/InstantSplitLogo";

// Styles
import styles from "./DefaultAndUserSettingsBar.module.css";

const DefaultAndUserSettingsBar = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const groupCode = localStorage.getItem("activeGroupCode");
  const isSlimDevice = useIsSlimDevice();

  const [isDefaultBarShown, setIsDefaultBarShown] = useState(true);

  // Validate active groupCode
  const { isValidated, groupExists } = useValidateGroupExistence(
    groupCode,
    "continuous"
  );

  // Handle invalid active groupCode
  useEffect(() => {
    if (isValidated && !groupExists) {
      deleteGroupDataFromLocalStorage(groupCode);
    }
  }, [navigate, groupCode, isValidated, groupExists]);

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
                <ReactIconNavigate
                  icon={PiUserPlus}
                  containerHeight='5.8'
                  containerWidth='7.2'
                  iconExplanationWidth='5'
                  explanationText={t("main-bar-invite-icon-text")}
                  iconExplanationTextAlignment='center'
                  iconExplanationIsIdleTranslateX='0.3'
                  route={`/share-group/${groupData.group.initialGroupName}/${groupCode}`}
                  iconSize={3.5}
                  translateY={0.4}
                  translateX={0.5}
                  iconScale={1}
                />
              </span>
              <span className={styles.instantSplitLogo}>
                <InstantSplitLogo width={"24"} />{" "}
              </span>
              <span className={styles.icon}>
                <ReactIconNavigate
                  icon={LuMenu}
                  containerHeight='5.8'
                  containerWidth='7.2'
                  iconSize={3.5}
                  iconScale={1.1}
                  translateY={0.3}
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
              containerHeight='5.8'
              containerWidth='8'
              explanationText={t("main-bar-back-icon-text")}
              iconSize={3.5}
              iconScale={1.05}
              onClick={hideUserSettings}
            />

            <ReactIconNavigate
              icon={IoInformationCircleOutline}
              containerHeight='5.8'
              containerWidth='8'
              explanationText={t("main-bar-tutorial-icon-text")}
              route={`/tutorial/${groupData?.group?.initialGroupName}/${groupCode}`}
              iconSize={3.5}
              iconScale={1.05}
            />
            <ReactIconNavigate
              icon={IoChatboxOutline}
              containerHeight='5.8'
              containerWidth='8'
              explanationText={t("main-bar-contact-icon-text")}
              route={`/contact/${groupCode}`}
              iconSize={3.5}
              iconScale={0.95}
            />
            <ReactIconNavigate
              icon={PiUserSwitchLight}
              containerHeight='5.8'
              containerWidth='8'
              explanationText={t("main-bar-manage-groups-icon-text")}
              iconExplanationWidth='9'
              route={`/manage-groups`}
              iconSize={3.5}
              iconScale={0.95}
            />
            <ReactIconNavigate
              icon={IoEnterOutline}
              containerHeight='5.8'
              containerWidth='8'
              iconExplanationWidth='6'
              explanationText={t("main-bar-leave-group-icon-text")}
              route={`/leave-group/${groupData?.group?.groupName}/${groupCode}`}
              iconSize={3.5}
              iconScale={1}
              translateX={-0.3}
              translateY={-0.1}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default DefaultAndUserSettingsBar;
