// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import CreateGroupMembersAndRenderMemberList from "../../components/features/CreateGroupMember/CreateGroupMembersAndRenderMemberList/CreateGroupMembersAndRenderMemberList";

// Styles
import styles from "./CreateGroupMemberPage.module.css";

function CreateGroupMemberPage() {
  // Check if current user is a new user, ie is redirected from create-group route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();
  const { t } = useTranslation();

  const isNewUser =
    previousRoute && isRetrieved
      ? previousRoute.includes("/onboarding-create-group")
      : false;

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("create-group-members-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"create-group-members"} />
      <InAppNavigationBar
        forward={true}
        forwardRoute='/onboarding-group-settings'
      />
      <div className={styles.container}>
        {!isNewUser ? <h1>{t("create-group-members-page-header")}</h1> : null}
        <h2>{t("create-group-members-form-header")}</h2>
        <CreateGroupMembersAndRenderMemberList />
      </div>
    </main>
  );
}
export default CreateGroupMemberPage;
