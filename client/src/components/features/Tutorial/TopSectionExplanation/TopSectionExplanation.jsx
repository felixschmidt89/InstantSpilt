// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";

// Components
import UserActionsBar from "../../UserActionsBar/UserActionsBar";
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

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
        <span className={styles.noWrap}>
          (
          <ReactIconNavigate
            iconSize={"1.7"}
            icon={IoPersonAddOutline}
            cursorPointer={false}
            translateY={0.3}
          />
          )
        </span>{" "}
        or leaving the group{" "}
        <span className={styles.noWrap}>
          (
          <ReactIconNavigate
            iconSize={"1.8"}
            icon={IoEnterOutline}
            cursorPointer={false}
            translateY={0.3}
          />
          )
        </span>{" "}
        .
      </p>
    </div>
  );
};

export default TopSectionExplanation;
