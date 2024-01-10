// React and Third-Party Libraries
import React from "react";
import useLocalStorage from "react-use-localstorage";

// Hooks
import useAuthenticateUsersActiveGroupCode from "../../hooks/useAuthenticateUsersActiveGroupCode";
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UserActionsBar from "../../components/features/UserActionsBar/UserActionsBar";
import GroupActionsBar from "../../components/features/GroupActionsBar/GroupActionsBar";
import RenderGroupBalances from "../../components/features/GroupBalances/RenderGroupBalances/RenderGroupBalances";
import RenderGroupHistory from "../../components/features/GroupHistory/RenderGroupHistory/RenderGroupHistory";
import SwitchViewButtonsBar from "../../components/features/SwitchViewButtonsBar/SwitchViewButtonsBar";

/**
 * Main component of the application. Checks on mount whether active groupCode exists in database. If not, groupCode will
 * be deleted from LocalStorage and navigated to homepage.
 * Renders or links to all core features.
 */
const InstantSplitPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, error: fetchGroupDataError } =
    useFetchGroupData(groupCode);
  // Retrieve the 'view' value from localStorage or set the default value
  const [view, setView] = useLocalStorage("viewState", "view2");

  useAuthenticateUsersActiveGroupCode(groupCode);

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
        {view === "view1" ? (
          <RenderGroupHistory groupCode={groupCode} />
        ) : (
          <RenderGroupBalances />
        )}
        <GroupActionsBar />
      </main>
    );
  }
};

export default InstantSplitPage;
