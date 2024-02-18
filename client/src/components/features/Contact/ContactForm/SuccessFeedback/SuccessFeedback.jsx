// React and Third-Party Libraries
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Styles
import styles from "./SuccessFeedback.module.css";

const SuccessFeedback = () => {
  return (
    <div className={styles.onSuccess}>
      <div className={styles.icon}>
        <IoMdCheckmarkCircleOutline />
      </div>
      <p className={styles.text}>
        Feedback received successfully - thanks! <br />
        Redirecting back to the main application now.
      </p>
    </div>
  );
};

export default SuccessFeedback;
