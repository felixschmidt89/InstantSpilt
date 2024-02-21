// React and Third-Party Libraries
import React from "react";
import { IoReorderThree } from "react-icons/io5";

// Components
import UserSettingsBar from "../../UserSettingsBar/UserSettingsBar";

// Styles
import styles from "./UserSettingsExplanation.module.css";

/**
 * Component for rendering explanation of the UserSettingsBar.
 *
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @param {string} props.initialGroupName - The initial group name.
 * @param {string} props.groupName - The current group name.
 * @returns {JSX.Element} React component.
 */
const UserSettingsExplanation = ({
  groupCode,
  initialGroupName,
  groupName,
}) => {
  return (
    <>
      <div className={styles.container}>
        <h2>
          <div className={styles.icon}>
            <IoReorderThree />
          </div>{" "}
          user settings
        </h2>
      </div>
      <div className={styles.bar}>
        <UserSettingsBar
          applyMargin={false}
          groupCode={groupCode}
          initialGroupName={initialGroupName}
          groupName={groupName}
        />
      </div>
    </>
  );
};

export default UserSettingsExplanation;
