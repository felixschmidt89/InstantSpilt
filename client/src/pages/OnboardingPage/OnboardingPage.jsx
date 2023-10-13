import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import ExplainMainFunctionalities from "../../components/containerComponents/ExplainMainFunctionalities/ExplainMainFunctionalities";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

function OnboardingPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Onboarding' />
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
