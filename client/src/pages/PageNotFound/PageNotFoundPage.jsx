// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Emoji from "../../components/common/Emoji/Emoji";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";

// Styles
import styles from "./PageNotFoundPage.module.css";

function PageNotFoundPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - page not found' />
      <InAppNavigationBar logoOnly={true} />
      <h1 className={styles.pageNotFoundHeader}>
        <Emoji label={"error emoji"} emoji={emojiConstants.error}></Emoji> 404 -
        Page not found
      </h1>
      <div className={styles.container}>
        <PiratePx COUNT_IDENTIFIER={"page-not-found"} />
        <div className={styles.pageNotFoundText}>
          <p>The page you&rsquo;re looking for does not exist.</p>
          <span className={styles.goToMainButton}>
            <RouteButton
              route={`instant-split`}
              buttonText='go to main'
              margin='0px'
            />
          </span>
        </div>
      </div>
    </main>
  );
}

export default PageNotFoundPage;
