import React from "react";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import TopSectionExplanation from "../../components/features/Tutorial/TopSectionExplanation/TopSectionExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/BottomSectionExplanation/BottomSectionExplanation";
import styles from "./OnboardingTutorialPage.module.css";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import { devLog } from "../../utils/errorUtils";

function OnboardingTutorialPage() {
  // Check whether user was redirected from invitation link
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const isRegularUser = !previousRoute.includes("join-instantsplit-group/");
  if (isRetrieved) {
    devLog("Current user is a regular user:", isRegularUser);
  }
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - onboarding tutorial' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-tutorial"} />
      {isRetrieved && isRegularUser ? (
        <InAppNavigationBar
          back={true}
          backRoute='/onboarding-groupcode-explanation'
          forward={true}
          forwardRoute='/instant-split'
        />
      ) : (
        // Disallow back navigation for invited users
        <InAppNavigationBar forward={true} forwardRoute='/instant-split' />
      )}

      <div className={styles.container}>
        <h1>Brief explanation</h1>
        <TopSectionExplanation />
        <MiddleSectionExplanation />
        <BottomSectionExplanation />
      </div>
    </main>
  );
}

export default OnboardingTutorialPage;
