import React from "react";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import ExplainMainFunctionalities from "../../components/features/Tutorial/ExplainMainFunctionalities/ExplainMainFunctionalities";

function OnboardingPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - onboarding' />
      <PiratePx COUNT_IDENTIFIER={"onboarding"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faRightLong}
        alignment={"right"}
        isIcon={true}
      />
      <h1>Brief explanation</h1>
      <ExplainMainFunctionalities />
    </main>
  );
}

export default OnboardingPage;
