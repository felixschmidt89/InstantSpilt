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
import InstantSplitLogo from "../../components/common/InstantSplitLogo/InstantSplitLogo";

const HomePage = () => {
  useGetActiveGroupCodeOrSetNextInactiveGroupCodeToActiveAndNavigateToMainApplication();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - homepage' />
      <span className={styles.instantSplitLogo}>
        <InstantSplitLogo width={"100"} linkToInstantSplitPage={false} />
      </span>
      <div className={styles.container}>
        <PiratePx COUNT_IDENTIFIER='homepage' />
        <h1 className={styles.homepageHeader}>Welcome to InstantSplit</h1>
        <InstantSplitIntroSection />
        <GetStartedSection />
        <TermsAndConditionsSection />
      </div>
    </main>
  );
};

export default HomePage;
