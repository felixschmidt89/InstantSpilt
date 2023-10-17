import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import styles from "./TermsAndConditions.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";
import termsAndConditionsContent from "../../contents/termsAndConditionsContent";

const TermsAndConditionsPage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify
        title='InstantSplit - Terms and Conditions'
        description='Instant Split - Terms and Conditions. Last updated on 17/10/2023.'
      />
      <PiratePx COUNT_IDENTIFIER={"terms-and-conditions"} />
      <NavigateButton
        route={"homepage"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <div className={styles.container}>
        <h1>Terms and Conditions</h1>
        <p className={styles.note}>
          By using InstantSplit, you acknowledge and accept our terms and
          conditions. If you do not agree with these terms, please do not use
          the application.
        </p>
        {termsAndConditionsContent.map((section) => (
          <div key={section.key}>
            <h2 className={styles.header}>{section.title}</h2>
            <p className={styles.content}>{section.content}</p>
          </div>
        ))}
      </div>
      <p className={styles.note}>
        These terms and conditions were last updated on{" "}
        <strong>17/11/2023</strong>.
      </p>
    </main>
  );
};

export default TermsAndConditionsPage;
