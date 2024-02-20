// React and Third-Party Libraries
import React from "react";
import { IoReorderThree } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";

// Components
import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./TopBar.module.css";

/**
 * TopBar component redendering add users to group, group name and UserSettingsBar switch.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.initialGroupName - The initial name of the group.
 * @param {string} props.groupCode - The code of the group.
 * @param {function} props.handleIconClick - Callback function for icon click.
 * @param {boolean} [props.animation=false] - Whether to apply mount animation to the component. Defaults to false.
 * @returns {JSX.Element} React component.
 */
const TopBar = ({
  groupName,
  initialGroupName,
  groupCode,
  handleIconClick,
  animation = false,
}) => {
  const containerClassName = `${styles.container} ${
    animation ? styles.slideInLeft : ""
  }`;

  return (
    <div className={containerClassName} role='toolbar' aria-label='top bar'>
      <span className={styles.inviteToGroupIcon}>
        <ReactIconNavigate
          icon={IoPersonAddOutline}
          containerHeight='5.8'
          containerWidth='7.2'
          iconExplanationIsIdle={true}
          route={`/share-group/${initialGroupName}/${groupCode}`}
          iconSize={3.5}
          translateY={0.1}
          translateX={-0.2}
          iconScale={0.8}
        />
      </span>
      <h1>{groupName}</h1>
      <span className={styles.icon}>
        {" "}
        <ReactIconNavigate
          icon={IoReorderThree}
          containerHeight='5.8'
          containerWidth='7.2'
          iconSize={3.5}
          iconScale={1.3}
          translateY={0.05}
          translateX={-0.1}
          onClick={handleIconClick}
        />
      </span>
    </div>
  );
};

export default TopBar;
