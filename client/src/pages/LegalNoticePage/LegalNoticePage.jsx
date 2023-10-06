import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import legalNoticeContent from "../../contents/legalNoticeContent";
import styles from "./LegalNoticePage.module.css";
import { Helmet } from "react-helmet-async";

const LegalNoticePage = () => {
  return (
    <main>
      <Helmet>
        <title>InstantSplit - Impressum</title>
        <link
          rel='canonical'
          href='https://instantsplit.netlify.app/legal-notice/'
        />
        <meta
          name='description'
          content='InstantSplit Impressum as required by the Telemediengesetz for German websites.'
        />

        <meta property='og:title' content='InstantSplit - Impressum' />
        <meta
          property='og:url'
          content='https://instantsplit.netlify.app/legal-notice/'
        />
        <meta
          property='og:description'
          content='InstantSplit Impressum as required by the Telemediengesetz for German websites.'
        />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='InstantSplit - Impressum' />
        <meta
          name='twitter:url'
          content='https://instantsplit.netlify.app/legal-notice/'
        />
        <meta
          name='twitter:description'
          content='InstantSplit Impressum as required by the Telemediengesetz for German websites.'
        />
      </Helmet>
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
