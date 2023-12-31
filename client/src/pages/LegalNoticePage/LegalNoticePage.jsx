import React from "react";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import legalNoticeContent from "../../contents/legalNoticeContent";
import styles from "./LegalNoticePage.module.css";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const LegalNoticePage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify
        title='InstantSplit - Impressum'
        description='Legal Notice as required by the Telemediengesetz for German websites.'
      />
      <PiratePx COUNT_IDENTIFIER={"legal-notice"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <div className={styles.container}>
        <h1>Legal notice (Impressum)</h1>
        <p className={styles.note}>
          As required by the Telemediengesetz for German websites.
        </p>
        {legalNoticeContent.map((section) => (
          <div key={section.key}>
            <h2 className={styles.header}>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LegalNoticePage;
