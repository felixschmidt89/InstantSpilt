// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";

// Components
import UserActionsBar from "../../UserActionsBar/UserActionsBar";
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./TopSectionExplanation.module.css";

/**
 * Component for rendering explanation of the main application's top section (containing user action bar).
 * @returns {JSX.Element} React component. */
const TopSectionExplanation = () => {
  return (
    <div>
      <h2>Top section</h2>
      <div className={styles.noLink}>
        <UserActionsBar />
      </div>
      <div className={styles}>
        Contains features not directly related to settling expenses, such as
        inviting others to the group{" "}
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
        , creating & switching to other groups (
        <ReactIconNavigate
          iconSize={"1.8"}
          icon={PiUserSwitchLight}
          cursorPointer={false}
          translateY={0.3}
        />
        ) or leaving the current group{" "}
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
      </div>
    </div>
  );
};

export default TopSectionExplanation;
