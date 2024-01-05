import React from "react";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import {
  sections,
  lastUpdateDate,
} from "../../contents/termsAndConditionsContent";
import TermsAndConditions from "../../components/features/TermsAndConditions/TermsAndConditions";
const TermsAndConditionsPage = () => {
  return (
    <main>
      {/* Set meta tags for the page */}
      <HelmetMetaTagsNetlify
        title='InstantSplit - Terms and Conditions'
        description={`Instant Split - Terms and Conditions. Last updated on ${lastUpdateDate}.`}
      />
      {/* Track page renders */}
      <PiratePx COUNT_IDENTIFIER={"terms-and-conditions"} />
      {/* Create a button for navigating to homepage */}
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <TermsAndConditions lastUpdateDate={lastUpdateDate} sections={sections} />
    </main>
  );
};

export default TermsAndConditionsPage;
