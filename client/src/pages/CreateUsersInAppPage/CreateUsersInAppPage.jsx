// React and Third-Party Libraries
import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CreateUserAndRenderUserList from "../../components/features/CreateUser/CreateUserAndRenderUserList/CreateUserAndRenderUserList";

// Styles
import styles from "./CreateUsersInAppPage.module.css";
import InAppNavigationBar from "../../components/common/InAppNavigationBar/InAppNavigationBar";

/**
 * Page for creating users within the main application.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
function CreateUsersInAppPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users-inapp"} />
      <InAppNavigationBar back={true} backRoute='/instant-split' />

      <div className={styles.container}>
        <CreateUserAndRenderUserList />
      </div>
    </main>
  );
}

export default CreateUsersInAppPage;
