import React from "react";
import { Link } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <HelmetMetaTagsNetlify title='InstantSplit - Homepage' />
      <div className={styles.introContainer}>
        <h1>Welcome to InstantSplit!</h1>
        <p>
          InstantSplit is the hassle-free way to settle group expenses with no
          user registration or app download while sharing minimal data.
        </p>
      </div>
      <div className={styles.groupContainer}>
        <Link to='/create-group' className={styles.groupLink}>
          <strong>Create a new group</strong>
        </Link>
        <Link to='/enter-groupcode' className={styles.groupLink}>
          <strong>Join an existing group</strong>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
