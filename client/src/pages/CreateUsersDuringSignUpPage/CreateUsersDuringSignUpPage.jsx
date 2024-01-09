// React and Third-Party Libraries
import React from "react";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CreateUser from "../../components/features/CreateUser/CreateUser/CreateUser";

// Styles
import styles from "./CreateUsersDuringSignUpPage.module.css";

const CreateUsersDuringSignUpPage = () => {
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
        <CreateUser />
      </div>
    </main>
  );
};

export default CreateUsersDuringSignUpPage;
