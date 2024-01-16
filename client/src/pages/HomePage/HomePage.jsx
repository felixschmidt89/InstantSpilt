// React and Third-Party Libraries
import React from "react";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import HomeIntroSection from "../../components/features/Home/HomeIntroSection/HomeIntroSection";
import HomeGetStartedSection from "../../components/features/Home/HomeGetStartedSection/HomeGetStartedSection";
import HomeTermsAndConditionsSection from "../../components/features/Home/HomeTermsAndConditionsSection/HomeTermsAndConditionsSection";

// Styles
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <HelmetMetaTagsNetlify title='InstantSplit - homepage' />
      <PiratePx COUNT_IDENTIFIER='homepage' />
      <HomeIntroSection />
      <HomeGetStartedSection />
      <HomeTermsAndConditionsSection />
    </main>
  );
};

export default HomePage;
