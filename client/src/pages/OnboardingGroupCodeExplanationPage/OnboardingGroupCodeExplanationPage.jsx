// React and Third-Party Libraries
import React from "react";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import OnboardingGroupCodeExplanation from "../../components/features/Onboarding/OnboardingGroupCodeExplanation/OnboardingGroupCodeExplanation";

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
      <PiratePx COUNT_IDENTIFIER={"groupcode-explanation"} />
      <NavigateButton
        route={"onboarding-tutorial"}
        buttonText={faRightLong}
        alignment={"right"}
        isIcon={true}
      />
      <div className={styles.container}>
        <OnboardingGroupCodeExplanation groupCode={groupCode} />
      </div>
    </main>
  );
};

export default OnboardingGroupCodeExplanationPage;
