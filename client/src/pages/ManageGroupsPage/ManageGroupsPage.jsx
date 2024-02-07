// React and Third-Party Libraries
import React, { useEffect } from "react";

// Hooks
import { setRouteInLocalStorage } from "../../utils/localStorageUtils";
import useValidateAndCleanupStoredGroupCodes from "../../hooks/useValidateAndCleanUpStoredGroupCodes";

// Components
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import CreateGroupForm from "../../components/features/ManageGroups/CreateGroup/CreateGroupForm/CreateGroupForm";
import SwitchGroups from "../../components/features/ManageGroups/SwitchGroups/SwitchGroups/SwitchGroups";
import ValidateGroupCode from "../../components/features/ManageGroups/ValidateGroupCode/ValidateGroupCode";

// Styles
import styles from "./ManageGroupsPage.module.css";

const ManageGroupsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  useValidateAndCleanupStoredGroupCodes();

  // Set previousRoute for nested navigation
  useEffect(() => {
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
  }, []);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - manage groups' />
      <PiratePx COUNT_IDENTIFIER={"manage-groups"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>group management</h1>
        <h2>switch group</h2>
        <SwitchGroups groupCode={groupCode} />
        <h2>join a different existing group</h2>
        <ValidateGroupCode />
        <h2>create a new group</h2>
        <CreateGroupForm isInAppCreation={false} />
      </div>
    </main>
  );
};

export default ManageGroupsPage;
