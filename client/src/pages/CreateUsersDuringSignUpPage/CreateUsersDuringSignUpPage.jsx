// React and Third-Party Libraries
import React from "react";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

// Hooks
import useDataRefresh from "../../hooks/useDataRefresh";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CreateUser from "../../components/features/CreateUser/CreateUser";
import RenderUserNames from "../../components/features/RenderUserNames/RenderUserNames";

// Styles
import styles from "./CreateUsersDuringSignUpPage.module.css";

const CreateUsersDuringSignUpPage = () => {
  // Use custom hook to get groupCode and manage data refresh logic update logic
  const { groupCode, refreshData, toggleDataRefresh } = useDataRefresh();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users-groupcreation"} />
      <div className={styles.container}>
        <NavigateButton
          route={"groupcode-explanation"}
          buttonText={faRightLong}
          alignment={"right"}
          isIcon={true}
        />
        <CreateUser
          toggleDataRefresh={toggleDataRefresh}
          groupCode={groupCode}
        />
        <RenderUserNames refreshData={refreshData} groupCode={groupCode} />
      </div>
    </main>
  );
};

export default CreateUsersDuringSignUpPage;
