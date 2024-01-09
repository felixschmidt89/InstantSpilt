import React from "react";
import { Link } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <HelmetMetaTagsNetlify title='InstantSplit - Homepage' />
      <PiratePx COUNT_IDENTIFIER='homepage' />
      <div className={styles.introContainer}>
        <h1>Welcome to InstantSplit!</h1>
        <p>
          InstantSplit is the hassle-free way to settle group expenses with no
          user registration or app download while sharing minimal data.
        </p>
        <div className={styles.strong}>
          <span className={styles.noWrap}>No cookies.</span>{" "}
          <span className={styles.noWrap}>No visitor tracking.</span>{" "}
          <span className={styles.noWrap}>No monetization.</span>{" "}
          <span className={styles.noWrap}>Ever.</span>
        </div>
      </div>
      <h2>Get started</h2>
      <div className={styles.groupContainer}>
        <Link to='/create-group' className={styles.groupLink}>
          <strong>Create a new group</strong>
        </Link>
        <Link to='/enter-groupcode' className={styles.groupLink}>
          <strong>Join an existing group</strong>
        </Link>
      </div>
      <p className={styles.terms}>
        By using InstantSplit you agree to our{" "}
        <span className={styles.noWrap}>
          <Link to='/terms-and-conditions/'>terms and conditions</Link>.
        </span>
      </p>
    </main>
  );
};

export default HomePage;
