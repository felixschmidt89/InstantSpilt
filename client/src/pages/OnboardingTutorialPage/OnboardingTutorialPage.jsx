import React from "react";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import TopSectionExplanation from "../../components/features/Tutorial/TopSectionExplanation/TopSectionExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/BottomSectionExplanation/BottomSectionExplanation";
import styles from "./OnboardingTutorialPage.module.css";

function OnboardingTutorialPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - onboarding tutorial' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-tutorial"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faRightLong}
        alignment={"right"}
        isIcon={true}
      />
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
