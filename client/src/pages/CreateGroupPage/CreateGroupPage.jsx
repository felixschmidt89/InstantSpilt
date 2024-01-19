// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./CreateGroupPage.module.css";
import CreateGroupForm from "../../components/features/ManageGroups/CreateGroup/CreateGroupForm/CreateGroupForm";

const OnboardingCreateGroupPage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - create group' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-create-group"} />
      <InAppNavigationBar back={true} backRoute={"/"} />
      <div className={styles.container}>
        <h1>Create a group</h1>
        <CreateGroupForm />
      </div>
    </main>
  );
};

export default OnboardingCreateGroupPage;
