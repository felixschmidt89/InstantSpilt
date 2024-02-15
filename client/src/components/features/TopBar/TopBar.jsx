// React and Third-Party Libraries
import React from "react";
import { IoReorderThree } from "react-icons/io5";

// Components
import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./TopBar.module.css";

/**
 * UserActionsBar component rendering tutorial, feedback and group management function icons.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupCode - The group code.
 *  @param {string} props.groupName - The initial group name.
 * @param {string} props.initialGroupName - The initial group name.
 * @returns {JSX.Element} UserActionsBar component.
 */
const TopBar = ({ groupName, handleIconClick }) => {
  return (
    <div className={styles.container}>
      <h1>{groupName}</h1>
      <span className={styles.icon}>
        {" "}
        <ReactIconNavigate
          icon={IoReorderThree}
          containerHeight='5.8'
          containerWidth='4'
          explanationText='user settings'
          iconSize={3}
          iconScale={1.4}
          translateY={0.3}
          onClick={handleIconClick}
        />
      </span>
    </div>
  );
};

export default TopBar;
