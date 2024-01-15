import React from "react";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import {
  sections,
  lastUpdateDate,
} from "../../contents/termsAndConditionsContent";
import TermsAndConditions from "../../components/features/TermsAndConditions/TermsAndConditions/TermsAndConditions";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import useGetPreviousRouteFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import { devLog } from "../../utils/errorUtils";
const TermsAndConditionsPage = () => {
  // Check whether user was redirected from invitation link
  const { previousRoute, isRetrieved } = useGetPreviousRouteFromLocalStorage();
  const isRegularUser = !previousRoute.includes("join-instantsplit-group/");
  if (isRetrieved) {
    devLog("Current user is a regular user:", isRegularUser);

    return (
      <main>
        {/* Set meta tags for the page */}
        <HelmetMetaTagsNetlify
          title='InstantSplit - Terms and Conditions'
          description={`Instant Split - Terms and Conditions. Last updated on ${lastUpdateDate}.`}
        />
        <PiratePx COUNT_IDENTIFIER={"terms-and-conditions"} />
        {isRetrieved && isRegularUser ? (
          <InAppNavigationBar back={true} />
        ) : (
          // Navigate invited users back to specified join instantsplit group page
          <InAppNavigationBar previousRoute={true} />
        )}
        <TermsAndConditions
          lastUpdateDate={lastUpdateDate}
          sections={sections}
        />
      </main>
    );
  }
};

export default TermsAndConditionsPage;
