// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Contact from "../../components/features/Contact/Contact/Contact";

// Styles
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - contact' />
      <PiratePx COUNT_IDENTIFIER={"contact"} />
      <InAppNavigationBar back={true} />
      <Contact />
    </main>
  );
};

export default ContactPage;
