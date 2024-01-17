// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Emoji from "../../components/common/Emoji/Emoji";

// Styles
import styles from "./PageNotFoundPage.module.css";

function PageNotFoundPage() {
  return (
    <main>
      <div className={styles.container}>
        <HelmetMetaTagsNetlify title='InstantSplit - page not found' />
        <PiratePx COUNT_IDENTIFIER={"page-not-found"} />
        <h1>
          <Emoji label={"error emoji"} emoji={emojiConstants.error}></Emoji> 404
          - Page not found
        </h1>
        <p>The page you&rsquo;re looking for does not exist.</p>
        <Link to='/'>Go to main</Link>
      </div>
    </main>
  );
}

export default PageNotFoundPage;
