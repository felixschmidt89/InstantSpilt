// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  deleteGroupDataFromLocalStorage,
  setViewStateInLocalStorage,
} from "../../utils/localStorageUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useDeletePreviousRouteFromLocalStorage from "../../hooks/useDeletePreviousRouteFromLocalStorage";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import GroupActionsBar from "../../components/features/ActiveGroupBar/ActiveGroupBar";
import SwitchViewButtonsBar from "../../components/features/GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";
import RenderGroupHistory from "../../components/features/GroupBalancesAndHistory/GroupHistory/RenderGroupHistory/RenderGroupHistory";
import RenderGroupBalances from "../../components/features/GroupBalancesAndHistory/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import DefaultAndUserSettingsBar from "../../components/features/DefaultAndUserSettingsBar/DefaultAndUserSettingsBar/DefaultAndUserSettingsBar";
import PwaCtaModal from "../../components/features/PwaCtaModal/PwaCtaModal/PwaCtaModal";

// Styles
import styles from "./InstantSplitPage.module.css";
import { devLog } from "../../utils/errorUtils";
import { currentTimeStamp } from "../../constants/dateConstants";
import useGetClientDeviceAndPwaInfo from "../../hooks/useGetClientDeviceAndPwaInfo";

/**
 * Renders the main screen of the application
 * @returns {JSX.Element} InstantSplitPage component.
 */
const InstantSplitPage = () => {
  const navigate = useNavigate();
  const groupCode = localStorage.getItem("activeGroupCode");
  const initialViewState = localStorage.getItem("viewState") || "view2";
  const [view, setView] = useState(initialViewState);

  // Handle no active groupCode
  useEffect(() => {
    if (!groupCode) {
      navigate("/");
    }
  }, [groupCode, navigate]);

  // Validate active groupCode
  const { isValidated, groupExists } = useValidateGroupExistence(
    groupCode,
    "continuous"
  );

  // Handle invalid active groupCode
  useEffect(() => {
    if (isValidated && !groupExists) {
      deleteGroupDataFromLocalStorage(groupCode);
      navigate("/");
    }
  }, [navigate, groupCode, isValidated, groupExists]);

  // Clear nested routes localStorage
  useDeletePreviousRouteFromLocalStorage();
  useDeletePreviousRouteFromLocalStorage("nestedPreviousRoute");

  const { groupData, isFetched } = useFetchGroupData(groupCode);

  // Function to update the view state and store it in local storage using the helper function
  const updateView = (newView) => {
    try {
      setViewStateInLocalStorage(newView);
      setView(newView);
    } catch (error) {
      console.error(
        `Error setting viewState to ${newView} in local storage.`,
        error
      );
    }
  };

  // Check if the PWA CTA should be shown
  let showCta = true; // Default to true if pwaCtaClosed does not exist in localStorage
  const pwaCtaClosed = localStorage.getItem("pwaCtaClosed");
  if (pwaCtaClosed) {
    const pwaCtaClosedTimestamp = Number(pwaCtaClosed);
    // Calculate the difference between the current timestamp and the stored timestamp
    showCta = currentTimeStamp - pwaCtaClosedTimestamp > 3600000; // 60 minutes in milliseconds
  }

  // State to manage modal visibility
  const [isCtaModalVisible, setIsCtaModalVisible] = useState(null);
  // iPad: Render modal only in Safari. For this to work, isIOS and isMobile must be false, both are true for all other browsers and they strangely also have Safari userAgent
  // Non iOS mobile devices, opposite to iOS mobile, conditions should work as expected

  const { isPwa, isMobile, isMobileSafari, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();
  // State to manage displayPrompt based on userAgent
  const [displayPrompt, setDisplayPrompt] = useState(null);

  useEffect(() => {
    if (
      isIOS &&
      isMobileSafari &&
      browserName.includes("Safari") &&
      !isPwa &&
      isMobile
    ) {
      setDisplayPrompt("iPadIPhone");
    } else if (isMobile && !isIOS && !isPwa) {
      if (browserName.includes("Firefox")) {
        setDisplayPrompt("firefox");
      } else if (browserName.includes("Samsung")) {
        setDisplayPrompt("samsung");
      } else {
        setDisplayPrompt(null);
      }
    } else {
      devLog("Not a mobile device we currently support for PWA install CTA.");
    }
  }, [isIOS, isMobileSafari, browserName, isPwa, isMobile]);

  useEffect(() => {
    setIsCtaModalVisible(displayPrompt !== null && showCta);
  }, [displayPrompt, showCta]);

  const closePrompt = () => {
    setDisplayPrompt(null);
  };

  return (
    <main>
      {!isFetched ? (
        <span className={styles.spinner}></span>
      ) : groupData.group ? (
        <>
          <HelmetMetaTagsNetlify title={`InstantSplit - main`} />
          <PiratePx COUNT_IDENTIFIER={"main-application"} />
          <DefaultAndUserSettingsBar />
          <div className={styles.topBar}>
            <h1>{groupData.group.groupName}</h1>
          </div>
          <SwitchViewButtonsBar view={view} updateView={updateView} />
          {view === "view1" ? (
            <RenderGroupHistory
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
          ) : (
            <RenderGroupBalances groupCurrency={groupData.group.currency} />
          )}
          <GroupActionsBar />
          {isCtaModalVisible && (
            <PwaCtaModal
              displayPrompt={displayPrompt}
              closePrompt={closePrompt}
              setIsCtaModalVisible={setIsCtaModalVisible}
            />
          )}
        </>
      ) : null}
    </main>
  );
};

export default InstantSplitPage;
