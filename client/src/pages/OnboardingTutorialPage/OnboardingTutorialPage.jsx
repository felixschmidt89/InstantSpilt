// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import TopSectionExplanation from "../../components/features/Tutorial/UserSettingsExplanation/UserSettingsExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/ActiveGroupBarExplanation/ActiveGroupBarExplanation";
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
    "/onboarding-group-settings"
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
          backRoute='/onboarding-group-settings'
          forward={true}
          forwardRoute='/instant-split'
        />
      ) : (
        // Disallow back navigation for invited users
        <div className={styles.rightAligned}>
          <InAppNavigationBar forward={true} />
        </div>
      )}

      <div className={styles.container}>
        <h1>onboarding</h1>
        <p className={styles.introText}>
          <strong>
            <Link to='/instant-split' className={styles.mainAppLink}>
              Skip to main app
            </Link>
          </strong>{" "}
          or discover key features below. You can revisit the complete tutorial
          anytime within the app.
        </p>
        <div className={styles.section}>
          <TopSectionExplanation />{" "}
        </div>
        <div className={styles.section}>
          <MiddleSectionExplanation />
        </div>
        <div className={styles.section}>
          <BottomSectionExplanation />
        </div>

        <div className={styles.skipToApp}>
          <Link to='/instant-split' className={styles.mainAppLink}>
            Go to main app
          </Link>
        </div>
      </div>
    </main>
  );
}

export default OnboardingTutorialPage;
