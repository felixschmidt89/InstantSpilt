import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import legalNoticeContent from "../../contents/legalNoticeContent";
import styles from "./LegalNoticePage.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

const LegalNoticePage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify
        title='InstantSplit - Impressum'
        description='Legal Notice as required by the Telemediengesetz for German websites.'
      />
      <NavigateButton route='instant-split' buttonText='⇦' alignment='left' />
      <div className={styles.container}>
        <h1>Legal notice (Impressum)</h1>
        <p className={styles.note}>
          As required by the Telemediengesetz for German websites.
        </p>
        {legalNoticeContent.map((section) => (
          <div key={section.key}>
            <h2>{section.title}</h2>
            {section.content}
          </div>
        ))}
      </div>
    </main>
  );
};

export default LegalNoticePage;
