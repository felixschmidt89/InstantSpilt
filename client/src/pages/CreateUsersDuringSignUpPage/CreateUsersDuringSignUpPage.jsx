// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CreateUserAndRenderUserList from "../../components/features/CreateUser/CreateUserAndRenderUserList/CreateUserAndRenderUserList";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./CreateUsersDuringSignUpPage.module.css";

const CreateUsersDuringSignUpPage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users-during-signup"} />
      <div className={styles.container}>
        <InAppNavigationBar
          forward={true}
          forwardRoute='/onboarding-groupcode-explanation'
        />
        <CreateUserAndRenderUserList />
      </div>
    </main>
  );
};

export default CreateUsersDuringSignUpPage;
