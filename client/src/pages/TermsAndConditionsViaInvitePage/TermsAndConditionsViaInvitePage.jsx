import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import styles from "./TermsAndConditionsViaInvitePage.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";
import {
  sections,
  lastUpdateDate,
} from "../../contents/termsAndConditionsContent";
import { useParams } from "react-router-dom";

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
      <div className={styles.container}>
        {/* Display the main title */}
        <h1>Terms and Conditions</h1>
        {/* Render a note about accepting terms and conditions and last update */}
        <p className={styles.note}>
          By using InstantSplit, you acknowledge and accept our terms and
          conditions. If you do not agree with these terms, please do not use
          the application. These terms and conditions were last updated on{" "}
          <strong>{lastUpdateDate}</strong>.
        </p>
        {/* Map through the terms and conditions content and display each section */}
        {sections.map((section) => (
          <div key={section.key}>
            <h2 className={styles.header}>{section.title}</h2>
            <p className={styles.content}>{section.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TermsAndConditionsViaInvitePage;
