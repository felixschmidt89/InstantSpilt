// React and Third-Party Libraries
import React from "react";

// Hooks
import useGetActiveGroupCodeOrSetNextInactiveGroupCodeToActiveAndNavigateToMainApplication from "../../hooks/useGetActiveGroupCodeOrSetNextInactiveGroupCodeToActiveAndNavigateToMainApplication";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InstantSplitIntroSection from "../../components/features/Home/InstantSplitIntroSection/InstantSplitIntroSection";
import GetStartedSection from "../../components/features/Home/GetStartedSection/GetStartedSection";
import TermsAndConditionsSection from "../../components/features/Home/TermsAndConditionsSection/TermsAndConditionsSection";

// Styles
import styles from "./HomePage.module.css";

const HomePage = () => {
  useGetActiveGroupCodeOrSetNextInactiveGroupCodeToActiveAndNavigateToMainApplication();

  return (
    <main>
      <div className={styles.container}>
        <HelmetMetaTagsNetlify title='InstantSplit - homepage' />
        <PiratePx COUNT_IDENTIFIER='homepage' />
        <h1>Welcome to InstantSplit</h1>
        <InstantSplitIntroSection />
        <GetStartedSection />
        <TermsAndConditionsSection />
      </div>
    </main>
  );
};

export default HomePage;
