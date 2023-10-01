import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <main className={styles.container}>
      <h1>Welcome to InstantSplit!</h1>
      <p>
        InstantSplit is the hassle-free way to settle group expenses with no
        user registration or app download while sharing minimal data.
      </p>
      <br />
      <h2>Get started:</h2>
      <h3>
        <Link to='/groupcode-explanation'>Create a new group</Link>
      </h3>
      <h3>
        <Link to='/enter-groupcode'>Join an existing group</Link>
      </h3>
    </main>
  );
};

export default HomePage;
