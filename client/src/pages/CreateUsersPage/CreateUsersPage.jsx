// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CreateUserAndRenderUserList from "../../components/features/CreateUser/CreateUserAndRenderUserList/CreateUserAndRenderUserList";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./CreateUsersPage.module.css";

function CreateUsersPage() {
  // Check if current user is a new user, ie is redirected from create-group route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const isNewUser = previousRoute.includes("/onboarding-create-group");
  if (isRetrieved) {
    devLog("Current user is a new user:", isNewUser);
  }

  // Check if current user has created group from within the application, ie is redirected from manage-groups route
  const isInAppGroupCreator = previousRoute.includes("/manage-groups");
  if (isRetrieved) {
    devLog("Current user is InstantSplit user:", isInAppGroupCreator);
  }

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users"} />
      {
        // Case 1: Navigate group creators users to onboarding group settings
        isNewUser || isInAppGroupCreator ? (
          <div className={styles.rightAligned}>
            <InAppNavigationBar
              forward={true}
              forwardRoute='/onboarding-group-settings'
            />
          </div>
        ) : (
          // Case 2: Render back button for default case (adding users to a group from within main application)
          <InAppNavigationBar back={true} />
        )
      }
      <div className={styles.container}>
        <CreateUserAndRenderUserList />
      </div>
    </main>
  );
}
export default CreateUsersPage;
