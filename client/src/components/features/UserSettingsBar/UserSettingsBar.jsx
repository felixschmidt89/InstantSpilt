// React and Third-Party Libraries
import React, { forwardRef } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
import { IoPersonAddOutline } from "react-icons/io5";

// Components
import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./UserSettingsBar.module.css";

/**
 * UserSettingsBar component rendering tutorial, feedback and group management function icons.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupCode - The group code.
 * @param {string} props.groupName - The initial group name.
 * @param {string} props.initialGroupName - The initial group name.
 * @param {function} props.switchToTopBar - Callback function to switch to TopBar.
 * @param {boolean} [props.animation=false] - Whether to apply mount animation to the component. Defaults to false.
 * @param {boolean} [props.applyMargin=true] - Whether to apply margin for the element. Defaults to true.
 * @returns {JSX.Element} React component.
 */
const UserSettingsBar = forwardRef(
  (
    {
      groupCode,
      initialGroupName,
      groupName,
      switchToTopBar,
      applyMargin = true,
      animation = false,
    },
    ref
  ) => {
    const containerClassName = `${styles.container} ${
      animation ? styles.slideInRight : ""
    } ${applyMargin ? styles.withMargin : ""}`;
    return (
      <div
        className={containerClassName}
        role='toolbar'
        aria-label='user settings'
        ref={ref}>
        <ReactIconNavigate
          icon={IoInformationCircleOutline}
          containerHeight='5.8'
          containerWidth='8'
          explanationText='tutorial'
          route={`/tutorial/${initialGroupName}/${groupCode}`}
          iconSize={3.5}
          iconScale={1.05}
        />
        <ReactIconNavigate
          icon={IoChatboxOutline}
          containerHeight='5.8'
          containerWidth='8'
          explanationText='feedback'
          route={`/contact/${groupCode}`}
          iconSize={3.5}
          iconScale={0.95}
        />
        <span className={styles.inviteToGroupIcon}>
          <ReactIconNavigate
            icon={IoPersonAddOutline}
            containerHeight='5.8'
            containerWidth='7.2'
            explanationText='invite to group'
            route={`/share-group/${initialGroupName}/${groupCode}`}
            iconSize={3.5}
            translateY={0}
            translateX={-0.2}
            iconScale={0.9}
          />
        </span>
        <ReactIconNavigate
          icon={PiUserSwitchLight}
          containerHeight='5.8'
          containerWidth='8'
          explanationText='switch/create group'
          iconExplanationWidth='9'
          route={`/manage-groups`}
          iconSize={3.5}
          iconScale={0.95}
        />
        <ReactIconNavigate
          icon={IoEnterOutline}
          containerHeight='5.8'
          containerWidth='8'
          iconExplanationWidth='6'
          explanationText='leave group'
          route={`/leave-group/${groupName}/${groupCode}`}
          iconSize={3.5}
          iconScale={1}
          translateX={-0.3}
          translateY={-0.1}
        />
      </div>
    );
  }
);

export default UserSettingsBar;

UserSettingsBar.displayName = "UserSettingsBar"; // Component name for React DevTools
