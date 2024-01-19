// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import OnboardingGroupCodeExplanation from "../../components/features/Onboarding/OnboardingGroupCodeExplanation/OnboardingGroupCodeExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./OnboardingGroupCodeExplanationPage.module.css";

/**
 * Page component for displaying crucial groupCode information for group creators upon group registration
 */
const OnboardingGroupCodeExplanationPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - groupCode explanation' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-groupcode-explanation"} />
      <InAppNavigationBar forward={true} forwardRoute='/onboarding-tutorial' />
      <div className={styles.container}>
        <OnboardingGroupCodeExplanation groupCode={groupCode} />
      </div>
    </main>
  );
};

export default OnboardingGroupCodeExplanationPage;
