// React and Third-Party Libraries
import React, { useEffect } from "react";
import useLocalStorage from "react-use-localstorage";
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
import UserActionsBar from "../../components/features/UserActionsBar/UserActionsBar";
import GroupActionsBar from "../../components/features/GroupActionsBar/GroupActionsBar";
import SwitchViewButtonsBar from "../../components/features/GroupBalancesAndHistory/SwitchViewButtonsBar/SwitchViewButtonsBar";
import RenderGroupHistory from "../../components/features/GroupBalancesAndHistory/GroupHistory/RenderGroupHistory/RenderGroupHistory";
import RenderGroupBalances from "../../components/features/GroupBalancesAndHistory/GroupBalances/RenderGroupBalances/RenderGroupBalances";

// Styles
import styles from "./InstantSplitPage.module.css";

/**
 * Main application
 * Renders group information, user actions, group actions and allows switching between group history and balances views.

 */ const InstantSplitPage = () => {
  const navigate = useNavigate();
  const groupCode = localStorage.getItem("activeGroupCode");

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

  // Retrieve the 'view' value from localStorage or set the default value
  const [view, setView] = useLocalStorage("viewState", "view2");

  // Clear nested routes localStorage
  useDeletePreviousRouteFromLocalStorage();
  useDeletePreviousRouteFromLocalStorage("nestedPreviousRoute");

  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };

  const { groupData, isFetched } = useFetchGroupData(groupCode);

  return (
    <main>
      {!isFetched ? (
        <span className={styles.spinner}>
          <Spinner />
        </span>
      ) : isValidated && groupExists ? (
        <>
          <HelmetMetaTagsNetlify title={`InstantSplit - main`} />
          <PiratePx COUNT_IDENTIFIER={"main-application"} />
          {/* Display group name */}
          <UserActionsBar
            groupCode={groupCode}
            groupName={groupData.group.groupName}
          />
          <h1>Group: {groupData.group.groupName}</h1>

          <SwitchViewButtonsBar
            view={view}
            handleSwitchView={handleSwitchView}
          />
          {view === "view1" ? (
            <RenderGroupHistory groupCode={groupCode} />
          ) : (
            <RenderGroupBalances />
          )}
          <GroupActionsBar />
        </>
      ) : null}
    </main>
  );
};

export default InstantSplitPage;
