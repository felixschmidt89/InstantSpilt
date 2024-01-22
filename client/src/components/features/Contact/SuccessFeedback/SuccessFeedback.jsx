// React and Third-Party Libraries
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Components
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./SuccessFeedback.module.css";

const SuccessFeedback = () => {
  return (
    <div className={styles.onSuccess}>
      <ReactIconNavigate
        icon={IoMdCheckmarkCircleOutline}
        cursorPointer={false}
        iconSize={2}
        translateY={0.5}
      />
      <p>
        Feedback received successfully - thanks! <br />
        Redirecting back to the main application now.
      </p>
    </div>
  );
};

export default SuccessFeedback;
