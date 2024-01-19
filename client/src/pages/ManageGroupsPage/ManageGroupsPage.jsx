// React and Third-Party Libraries
import React from "react";

// Components
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import CreateGroupForm from "../../components/features/ManageGroups/CreateGroup/CreateGroupForm/CreateGroupForm";
import SwitchGroups from "../../components/features/ManageGroups/SwitchGroups/SwitchGroups/SwitchGroups";

// Styles
import styles from "./ManageGroupsPage.module.css";

const ManageGroupsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - manage groups' />
      <PiratePx COUNT_IDENTIFIER={"manage-groups"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>Manage groups</h1>
        <SwitchGroups groupCode={groupCode} />
        <h2>Create new group</h2>
        <CreateGroupForm />
        <h2>Enter groupCode</h2>
        <p>
          If you&lsquo;ve been given a groupCode, enter it here to join that
          group:
        </p>
      </div>
    </main>
  );
};

export default ManageGroupsPage;
