import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { BiMessageError } from "react-icons/bi";

import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import styles from "./UserActionsBar.module.css";

const UserActionsBar = ({ groupCode, initialGroupName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>
          <ReactIconNavigate
            icon={BiMessageError}
            tooltip='contact InstantSplit team'
            route={`/contact/${groupCode}`}
            iconSize={3.7}
            translateY={0.1}
          />
        </span>
        <span className={styles.iconExplanation}>feedback</span>
      </div>

      <div className={styles.iconContainer}>
        <span className={styles.icon}>
          <ReactIconNavigate
            icon={IoHelpCircleOutline}
            tooltip='show explanation of main functions'
            route={`/tutorial/${initialGroupName}/${groupCode}`}
            iconSize={4.2}
          />
        </span>
        <span className={styles.iconExplanation}>tutorial</span>
      </div>

      <div className={styles.iconContainer}>
        <span className={styles.icon}>
          <ReactIconNavigate
            icon={IoPersonAddOutline}
            tooltip='share access to this group'
            route={`/share-group/${initialGroupName}/${groupCode}`}
            iconSize={3.5}
            translateY={0.3}
          />
        </span>
        <span className={styles.iconExplanation}>share group access</span>
      </div>

      <div className={styles.iconContainer}>
        <span className={styles.icon}>
          <ReactIconNavigate
            icon={PiUserSwitchLight}
            tooltip='switch, create or join other groups'
            route={`/manage-groups`}
            iconSize={4.2}
            marginRight={0.2}
          />
        </span>
        <span className={styles.iconExplanation}>switch/create group</span>
      </div>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>
          <ReactIconNavigate
            icon={IoEnterOutline}
            tooltip='leave this group'
            route={`/leave-group/${initialGroupName}/${groupCode}`}
            iconSize={4}
          />
        </span>
        <span className={styles.iconExplanation}>
          leave <br />
          group
        </span>
      </div>
    </div>
  );
};

export default UserActionsBar;
