// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import { lastUpdateDate } from "../../contents/termsAndConditionsContent";
import { devLog } from "../../utils/errorUtils";

// Hooks
import useGetPreviousRouteFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import TermsAndConditions from "../../components/features/TermsAndConditions/TermsAndConditions/TermsAndConditions";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./TermsAndConditionsPage.module.css";

const TermsAndConditionsPage = () => {
  // Check if current user is an invited user, ie is redirected from join-instantsplit-group route
  const { previousRoute, isRetrieved } = useGetPreviousRouteFromLocalStorage();

  const isInvitedUser = previousRoute.includes("join-instantsplit-group/");
  if (isRetrieved) {
    devLog("Current user is an invited user:", isInvitedUser);
  }

  return (
    <main>
      <HelmetMetaTagsNetlify
        title='InstantSplit - Terms and Conditions'
        description={`Instant Split - Terms and Conditions. Last updated on ${lastUpdateDate}.`}
      />
      <PiratePx COUNT_IDENTIFIER={"terms-and-conditions"} />
      {/* Navigate invited users back to accept group invitation page */}
      {isRetrieved && isInvitedUser && (
        <InAppNavigationBar previousRoute={true} />
      )}
      {isRetrieved && !isInvitedUser && <InAppNavigationBar back={true} />}
      <div className={styles.container}>
        <TermsAndConditions />
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;
