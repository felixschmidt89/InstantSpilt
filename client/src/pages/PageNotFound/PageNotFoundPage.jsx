import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFoundPage.module.css";

function PageNotFoundPage() {
  return (
    <main className={styles.pageNotFound}>
      <h1>🚧 404 - Page not found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to='/'>Go to main</Link>
    </main>
  );
}

export default PageNotFoundPage;
