import React from "react";
import { Link } from "react-router-dom";
import MetaTags from "../../components/reuseableComponents/MetaTags/MetaTags";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.introContainer}>
        <h1>Welcome to InstantSplit!</h1>
        <p>
          InstantSplit is the hassle-free way to settle group expenses with no
          user registration or app download while sharing minimal data.
        </p>
      </div>
      <div className={styles.groupContainer}>
        <Link to='/groupcode-explanation' className={styles.groupLink}>
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
