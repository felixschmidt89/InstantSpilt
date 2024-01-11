import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import {
  sections,
  lastUpdateDate,
} from "../../contents/termsAndConditionsContent";
import TermsAndConditions from "../../components/features/TermsAndConditions/TermsAndConditions/TermsAndConditions";

/**
 * TermsAndConditions page for users joining a group via invite link, ensuring that the back button renders the URL associated with the group they have been invited to.
 */
const TermsAndConditionsViaInvitePage = () => {
  const { groupName, groupCode } = useParams();
  return (
    <main>
      {/* Set meta tags for the page */}
      <HelmetMetaTagsNetlify
        title='InstantSplit - Terms and Conditions'
        description={`Instant Split - Terms and Conditions. Last updated on ${lastUpdateDate}.`}
      />
      {/* Track page renders */}
      <PiratePx COUNT_IDENTIFIER={"terms-and-conditions-via-invite"} />
      {/* Create a button for navigating back to invite URL */}
      <NavigateButton
        route={`join/${groupName}/${groupCode}`}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <TermsAndConditions lastUpdateDate={lastUpdateDate} sections={sections} />
    </main>
  );
};

export default TermsAndConditionsViaInvitePage;
