// React and Third-Party Libraries
import React from "react";
import { IoReorderThree } from "react-icons/io5";

// Components
import UserSettingsBar from "../../UserSettingsBar/UserSettingsBar";

// Styles
import styles from "./UserSettingsExplanation.module.css";

/**
 * Component for rendering explanation of the UserSettingsBar.
 * @returns {JSX.Element} React component. */
const UserSettingsExplanation = () => {
  return (
    <div className={styles.container}>
      <h2>
        <div className={styles.icon}>
          <IoReorderThree />
        </div>{" "}
        user settings
      </h2>
      <ul className={styles.explanation}>
        <li className={styles.noLink}>
          <UserSettingsBar applyMargin={false} />
        </li>
      </ul>
    </div>
  );
};

export default UserSettingsExplanation;
