// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const isNewUser = previousRoute.includes("/onboarding-create-group");
  if (isRetrieved) {
    devLog("Current user is a new user:", isNewUser);
  }
  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-users-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"create-users"} />
      {isNewUser ? (
        <InAppNavigationBar
          forward={true}
          forwardRoute='/onboarding-group-settings'
        />
      ) : (
        <InAppNavigationBar back={true} />
      )}
      <div className={styles.container}>
        {!isNewUser ? <h1>{t("create-users-page-header")}</h1> : null}
        <h2>{t("create-users-form-header")}</h2>
        <CreateUserAndRenderUserList />
      </div>
    </main>
  );
}
export default CreateUsersPage;
