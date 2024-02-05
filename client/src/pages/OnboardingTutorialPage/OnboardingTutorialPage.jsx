// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import TopSectionExplanation from "../../components/features/Tutorial/TopSectionExplanation/TopSectionExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/BottomSectionExplanation/BottomSectionExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./OnboardingTutorialPage.module.css";

/**
 * Renders the onboarding tutorial page show to group creators and users joining a group via invitation link
 *
 */
function OnboardingTutorialPage() {
  // Check if current user is a new user and a group creator, ie is redirected from onboarding-groupcode-explanation route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const isNewUserGroupCreator = previousRoute.includes(
    "/onboarding-groupcode-explanation"
  );
  if (isRetrieved) {
    devLog(
      "Current user is a new user and a group creator:",
      isNewUserGroupCreator
    );
  }
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - onboarding tutorial' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-tutorial"} />
      {isRetrieved && isNewUserGroupCreator ? ( // Allow back navigation for new user group creators
        <InAppNavigationBar
          back={true}
          backRoute='/onboarding-groupcode-explanation'
          forward={true}
          forwardRoute='/instant-split'
        />
      ) : (
        // Disallow back navigation for invited users
        <InAppNavigationBar forward={true} />
      )}

      <div className={styles.container}>
        <h1>Onboarding</h1>
        <TopSectionExplanation />
        <MiddleSectionExplanation />
        <BottomSectionExplanation />
      </div>
    </main>
  );
}

export default OnboardingTutorialPage;
