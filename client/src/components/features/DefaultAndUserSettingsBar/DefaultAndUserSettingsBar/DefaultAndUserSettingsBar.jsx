// React and Third-Party Libraries
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";

// Constants and Utils
import { deleteGroupDataFromLocalStorage } from "../../../../utils/localStorageUtils";

// Hooks
import useValidateGroupExistence from "../../../../hooks/useValidateGroupCodeExistence";
import useFetchGroupData from "../../../../hooks/useFetchGroupData";

// Components
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./DefaultAndUserSettingsBar.module.css";
import InstantSplitLogo from "../../../common/InstantSplitLogo/InstantSplitLogo";

const DefaultAndUserSettingsBar = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const groupCode = localStorage.getItem("activeGroupCode");
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
              {/* Here's the missing opening <span> tag */}
              <span className={styles.icon}>
                <ReactIconNavigate
                  icon={FaUserPlus}
                  containerHeight='5.8'
                  containerWidth='7.2'
                  iconExplanationWidth='5'
                  explanationText='invite'
                  iconExplanationTextAlignment='left'
                  iconExplanationIsIdleTranslateX='1'
                  route={`/share-group/${groupData.group.initialGroupName}/${groupCode}`}
                  iconSize={3.5}
                  translateY={0.1}
                  translateX={0}
                  iconScale={0.8}
                />
              </span>
              <span className={styles.instantSplitLogo}>
                <InstantSplitLogo width={"24"} />{" "}
              </span>
              <span className={styles.icon}>
                <ReactIconNavigate
                  icon={IoReorderThree}
                  containerHeight='5.8'
                  containerWidth='7.2'
                  iconSize={3.5}
                  iconScale={1.5}
                  translateY={0.4}
                  translateX={-0.3}
                  iconExplanationWidth='5'
                  iconExplanationTextAlignment='right'
                  iconExplanationIsIdleTranslateX='-1'
                  explanationText='more'
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
              explanationText='back'
              iconSize={3.5}
              iconScale={1.05}
              onClick={hideUserSettings}
            />

            <ReactIconNavigate
              icon={IoInformationCircleOutline}
              containerHeight='5.8'
              containerWidth='8'
              explanationText='tutorial'
              route={`/tutorial/${groupData?.group?.initialGroupName}/${groupCode}`}
              iconSize={3.5}
              iconScale={1.05}
            />
            <ReactIconNavigate
              icon={IoChatboxOutline}
              containerHeight='5.8'
              containerWidth='8'
              explanationText='contact'
              route={`/contact/${groupCode}`}
              iconSize={3.5}
              iconScale={0.95}
            />
            <ReactIconNavigate
              icon={PiUserSwitchLight}
              containerHeight='5.8'
              containerWidth='8'
              explanationText='switch/create group'
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
              explanationText='leave group'
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
