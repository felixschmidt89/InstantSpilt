import React from "react";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import legalNoticeContent from "../../contents/legalNoticeContent";
import styles from "./LegalNoticePage.module.css";

const LegalNoticePage = () => {
  return (
    <main>
      <NavigateButton
        route='instant-split'
        buttonText='back'
        alignment='left'
      />
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
