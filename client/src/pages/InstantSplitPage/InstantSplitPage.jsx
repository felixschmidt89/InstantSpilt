// React and Third-Party Libraries
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import { deleteGroupDataFromLocalStorage } from "../../utils/localStorageUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useDeletePreviousRouteFromLocalStorage from "../../hooks/useDeletePreviousRouteFromLocalStorage";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UserSettingsBar from "../../components/features/UserSettingsBar/UserSettingsBar";
import GroupActionsBar from "../../components/features/GroupActionsBar/GroupActionsBar";
import SwitchViewButtonsBar from "../../components/features/GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";
import RenderGroupHistory from "../../components/features/GroupBalancesAndHistory/GroupHistory/RenderGroupHistory/RenderGroupHistory";
import RenderGroupBalances from "../../components/features/GroupBalancesAndHistory/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import TopBar from "../../components/features/TopBar/TopBar";

// Styles
import styles from "./InstantSplitPage.module.css";

/**
 * Renders the main screen of the application
 * @returns {JSX.Element} InstantSplitPage component.
 */
const InstantSplitPage = () => {
  const navigate = useNavigate();
  const groupCode = localStorage.getItem("activeGroupCode");
  const userSettingsBarRef = useRef(null);

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

  const { groupData, isFetched } = useFetchGroupData(groupCode);

  // State and callbacks to manage active top component
  const [activeComponent, setActiveComponent] = useState("TopBar");

  const switchToTopBar = useCallback(() => {
    setActiveComponent("TopBar");
  }, []);

  const switchToUserSettingsBar = () => {
    setActiveComponent("UserSettingsBar");
  };

  const switchToTopBarWhenClickingOutsideUserSettingsBar = useCallback(
    (event) => {
      if (
        userSettingsBarRef.current &&
        !userSettingsBarRef.current.contains(event.target)
      ) {
        switchToTopBar();
      }
    },
    [switchToTopBar]
  );

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      switchToTopBarWhenClickingOutsideUserSettingsBar
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        switchToTopBarWhenClickingOutsideUserSettingsBar
      );
    };
  }, [switchToTopBarWhenClickingOutsideUserSettingsBar]);

  // State to keep track of the balance and history views
  const [view, setView] = useState(
    () => localStorage.getItem("viewState") || "view2"
  );
  // Clear nested routes localStorage
  useDeletePreviousRouteFromLocalStorage();
  useDeletePreviousRouteFromLocalStorage("nestedPreviousRoute");

  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };

  return (
    <main>
      {!isFetched ? (
        <span className={styles.spinner}>
          <Spinner />
        </span>
      ) : groupData.group ? (
        <>
          <HelmetMetaTagsNetlify title={`InstantSplit - main`} />
          <PiratePx COUNT_IDENTIFIER={"main-application"} />
          <div className={styles.topBar}>
            {activeComponent === "UserSettingsBar" ? (
              <UserSettingsBar
                groupCode={groupCode}
                initialGroupName={groupData.group.initialGroupName}
                groupName={groupData.group.groupName}
                switchToTopBar={switchToTopBar}
                ref={userSettingsBarRef}
              />
            ) : (
              <TopBar
                groupCode={groupCode}
                initialGroupName={groupData.group.initialGroupName}
                groupName={groupData.group.groupName}
                handleIconClick={switchToUserSettingsBar}
              />
            )}
          </div>
          <SwitchViewButtonsBar
            view={view}
            handleSwitchView={handleSwitchView}
          />
          {view === "view1" ? (
            <RenderGroupHistory
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
          ) : (
            <RenderGroupBalances groupCurrency={groupData.group.currency} />
          )}
          <GroupActionsBar />
        </>
      ) : null}
    </main>
  );
};

export default InstantSplitPage;
