// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";

import CreateUserAndRenderUserList from "../../components/features/CreateUser/CreateUserAndRenderUserList/CreateUserAndRenderUserList";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./CreateUsersInAppPage.module.css";

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
