import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UserActionsBar from "../../components/features/UserActionsBar/UserActionsBar";
import GroupActionsBar from "../../components/features/GroupActionsBar/GroupActionsBar";
import RenderGroupBalances from "../../components/features/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import RenderGroupHistory from "../../components/features/GroupHistory/RenderGroupHistory/RenderGroupHistory";

import useFetchGroupData from "../../hooks/useFetchGroupData";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

import {
  removeActiveGroupCodeFromLocalStorage,
  removeActiveGroupCodeFromStoredGroupCodes,
  removeViewStateFromLocalStorage,
} from "../../utils/localStorageUtils";

import styles from "./InstantSplitPage.module.css";
import SwitchViewButtonsBar from "../../components/features/SwitchViewButtonsBar/SwitchViewButtonsBar";

/**
 * Main component of the application. Checks on mount whether active groupCode exists in database. If not, groupCode will
 * be deleted from LocalStorage and navigated to homepage.
 * Renders or links to all core features.
 */
const InstantSplitPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const navigate = useNavigate();

  // Check if active groupCode is valid
  const [groupExists] = useValidateGroupExistence({
    groupCode,
  });

  // If not, delete it from LocalStorage and navigate to homepage
  useEffect(() => {
    if (groupExists === false) {
      removeActiveGroupCodeFromStoredGroupCodes(groupCode);
      removeActiveGroupCodeFromLocalStorage();
      removeViewStateFromLocalStorage();
      navigate("/homepage/");
    }
  }, [navigate, groupCode, groupExists]);

  // Fetch group group data
  const groupData = useFetchGroupData(groupCode);

  // Use useLocalStorage to initialize and persist the view state with a default of "view2"
  const [view, setView] = useLocalStorage("viewState", "view2");

  // Handle user view switches
  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };
  // Render spinner until data is fetched
  if (groupData === null) {
    return (
      <main>
        <Spinner />
      </main>
    );
  } else if (groupData && groupData.group) {
    return (
      <main>
        <HelmetMetaTagsNetlify
          title={`InstantSplit - main (${groupData.group.groupName})`}
        />
        <PiratePx COUNT_IDENTIFIER={"main"} />

        {/* Display group name */}
        <h1>{groupData.group.groupName}</h1>
        <UserActionsBar
          groupCode={groupCode}
          groupName={groupData.group.groupName}
        />
        <SwitchViewButtonsBar view={view} handleSwitchView={handleSwitchView} />
        {view === "view1" ? <RenderGroupHistory /> : <RenderGroupBalances />}
        <GroupActionsBar />
      </main>
    );
  }
};

export default InstantSplitPage;
