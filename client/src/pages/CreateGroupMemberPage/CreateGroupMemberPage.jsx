// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import useTriggerRerender from "../../hooks/useTriggerRerender";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMemberForm from "../../components/features/CreateGroupMember/CreateGroupMemberForm/CreateGroupMemberForm";
import RenderGroupMemberNames from "../../components/features/CreateGroupMember/RenderGroupMemberNames/RenderGroupMemberNames";

// Styles
import styles from "./CreateGroupMemberPage.module.css";

function CreateGroupMemberPage() {
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();
  const { t } = useTranslation();

  // Check if current user is a new user, ie is redirected from onboarding-create-group route
  const isNewUser =
    previousRoute && isRetrieved
      ? previousRoute.includes("/onboarding-create-group")
      : false;

  // Check if current user has created a new group within the application, ie is redirected from mangage-groups route
  const isInAppGroupCreation =
    previousRoute && isRetrieved
      ? previousRoute.includes("/manage-groups")
      : false;

  // Check if current user is redirected from main application
  const previousRouteExists = localStorage.getItem("previousRoute");
  const isRegularUser = !previousRouteExists;

  // Custom hook to get groupCode and trigger rerender logic
  const { groupCode, rerenderTrigger, incrementRerenderTrigger } =
    useTriggerRerender();

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-group-members-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"create-group-members"} />
      <InAppNavigationBar
        abort={isNewUser || isInAppGroupCreation ? true : false}
        abortRoute={isInAppGroupCreation ? "/manage-groups" : "/"}
        back={isRegularUser ? true : false}
        forward={isNewUser || isInAppGroupCreation ? true : false}
        forwardRoute='/onboarding-group-settings'
      />
      <div className={styles.addGroupMember}>
        {!isNewUser ? <h1>{t("create-group-members-page-header")}</h1> : null}
        <h2>{t("create-group-members-form-header")}</h2>
        <CreateGroupMemberForm
          incrementRerenderTrigger={incrementRerenderTrigger}
          groupCode={groupCode}
        />
      </div>
      <div className={styles.container}>
        <RenderGroupMemberNames
          rerenderTrigger={rerenderTrigger}
          groupCode={groupCode}
          incrementRerenderTrigger={incrementRerenderTrigger}
          isInAppGroupCreation={isInAppGroupCreation}
        />
      </div>
    </main>
  );
}
export default CreateGroupMemberPage;
