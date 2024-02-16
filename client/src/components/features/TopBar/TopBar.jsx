// React and Third-Party Libraries
import React from "react";
import { IoReorderThree } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";

// Components
import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./TopBar.module.css";

/**
 * TopBar component rendering tutorial, feedback and group management function icons.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupCode - The group code.
 * @param {string} props.initialGroupName - The initial group name.
 * @returns {JSX.Element} React component.
 */
const TopBar = ({
  groupName,
  initialGroupName,
  groupCode,
  handleIconClick,
}) => {
  return (
    <div className={styles.container}>
      <ReactIconNavigate
        icon={IoPersonAddOutline}
        containerHeight='5.8'
        containerWidth='7.2'
        explanationText='invite to group'
        route={`/share-group/${initialGroupName}/${groupCode}`}
        iconSize={3.5}
        translateY={0.1}
        translateX={-0.2}
        iconScale={0.8}
      />
      <h1>{groupName}</h1>
      <span className={styles.icon}>
        {" "}
        <ReactIconNavigate
          icon={IoReorderThree}
          containerHeight='5.8'
          containerWidth='7.2'
          iconSize={3.5}
          iconScale={1.2}
          translateY={1}
          onClick={handleIconClick}
        />
      </span>
    </div>
  );
};

export default TopBar;
