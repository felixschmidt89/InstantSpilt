// React and Third-Party Libraries
import React, { forwardRef } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";

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
 * @returns {JSX.Element} React component.
 */
const UserSettingsBar = forwardRef(
  ({ groupCode, initialGroupName, groupName, switchToTopBar }, ref) => {
    return (
      <div className={styles.container} ref={ref}>
        <ReactIconNavigate
          icon={IoInformationCircleOutline}
          containerHeight='5.8'
          containerWidth='14'
          explanationText='tutorial'
          route={`/tutorial/${initialGroupName}/${groupCode}`}
          iconSize={3.5}
          iconScale={1.05}
        />
        <ReactIconNavigate
          icon={IoChatboxOutline}
          containerHeight='5.8'
          containerWidth='14'
          explanationText='feedback'
          route={`/contact/${groupCode}`}
          iconSize={3.5}
          iconScale={0.95}
        />
        <ReactIconNavigate
          icon={PiUserSwitchLight}
          containerHeight='5.8'
          containerWidth='14'
          explanationText='switch/create group'
          route={`/manage-groups`}
          iconSize={3.5}
          iconScale={1.05}
        />
        <ReactIconNavigate
          icon={IoEnterOutline}
          containerHeight='5.8'
          containerWidth='14'
          explanationText='leave group'
          route={`/leave-group/${groupName}/${groupCode}`}
          iconSize={3.5}
          iconScale={0.95}
          translateX={-0.3}
        />
      </div>
    );
  }
);

export default UserSettingsBar;

UserSettingsBar.displayName = "UserSettingsBar"; // Component name for React DevTools
