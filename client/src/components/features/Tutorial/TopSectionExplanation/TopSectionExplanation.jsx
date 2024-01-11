// React and Third-Party Libraries
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

// Components
import UserActionsBar from "../../UserActionsBar/UserActionsBar";

// Styles
import styles from "./TopSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's top section (containing user action bar).
 * @component
 * @returns {JSX.Element} - TopSectionExplanation component
 */
const TopSectionExplanation = () => {
  return (
    <div>
      <h2>Top section</h2>
      <div className={styles.noLink}>
        <UserActionsBar />
      </div>
      <p className={styles}>
        Contains features not directly related to settling expenses, such as
        inviting others{" "}
        <span className={styles.icons}>
          (<FontAwesomeIcon icon={faUserPlus} />)
        </span>{" "}
        or leaving the group{" "}
        <span className={styles.icons}>
          (<FontAwesomeIcon icon={faRightFromBracket} />)
        </span>
        .
      </p>
    </div>
  );
};

export default TopSectionExplanation;
