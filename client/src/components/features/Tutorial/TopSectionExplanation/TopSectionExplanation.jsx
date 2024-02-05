// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoHelpCircleOutline } from "react-icons/io5";

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
      <h2>user bar</h2>
      <div className={styles.noLink}>
        <UserActionsBar />
      </div>
      <div className={styles}>
        show tutorial
        <span className={styles.noWrap}>
          (
          <ReactIconNavigate
            iconSize={"1.9"}
            icon={IoHelpCircleOutline}
            cursorPointer={false}
            translateY={0.5}
          />
          ),
        </span>{" "}
        invite others to group{" "}
        <span className={styles.noWrap}>
          (
          <ReactIconNavigate
            iconSize={"1.7"}
            icon={IoPersonAddOutline}
            cursorPointer={false}
            translateY={0.3}
          />
          ),
        </span>
        {""} create or switch to other group (
        <ReactIconNavigate
          iconSize={"1.8"}
          icon={PiUserSwitchLight}
          cursorPointer={false}
          translateY={0.3}
        />
        ) & leave group{" "}
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
