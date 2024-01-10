import React from "react";
import { Link } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import styles from "./PageNotFoundPage.module.css";

function PageNotFoundPage() {
  return (
    <main className={styles.pageNotFound}>
      <HelmetMetaTagsNetlify title='InstantSplit - page not found' />
      <PiratePx COUNT_IDENTIFIER={"page-not-found"} />
      <h1>🚧 404 - Page not found</h1>
      <p>The page you&rsquo;re looking for does not exist.</p>
      <Link to='/'>Go to main</Link>
    </main>
  );
}

export default PageNotFoundPage;
