// React and Third-Party Libraries
import React from "react";

// Contents
import {
  authorInfo,
  legalNoticeSections,
} from "../../contents/legalNoticeContent";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import LegalNoticeAuthor from "../../components/features/LegalNotice/LegalNoticeAuthor/LegalNoticeAuthor";
import LegalNoticeSections from "../../components/features/LegalNotice/LegalNoticeSections/LegalNoticeSections";

// Styles
import styles from "./LegalNoticePage.module.css";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import { devLog } from "../../utils/errorUtils";

const LegalNoticePage = () => {
  // Check if current user is an invited user, ie is redirected from join-instantsplit-group route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const isInvitedUser = previousRoute.includes("join-instantsplit-group/");
  if (isRetrieved) {
    devLog("Current user is an invited user:", isInvitedUser);
  }

  return (
    <main>
      <HelmetMetaTagsNetlify
        title='InstantSplit - Impressum'
        description='Legal Notice as required by the Telemediengesetz for German websites.'
      />
      <PiratePx COUNT_IDENTIFIER={"legal-notice"} />
      {/* Navigate invited users back to accept group invitation page */}
      {isRetrieved && isInvitedUser && (
        <InAppNavigationBar previousRoute={true} />
      )}
      {isRetrieved && !isInvitedUser && <InAppNavigationBar back={true} />}
      <div className={styles.container}>
        <h1>Legal Notice (Impressum)</h1>
        <p className={styles.note}>
          As required by the Telemediengesetz for German websites.
        </p>
        <LegalNoticeAuthor authorInfo={authorInfo} />
        <LegalNoticeSections LegalNoticeSections={legalNoticeSections} />
      </div>
    </main>
  );
};

export default LegalNoticePage;
