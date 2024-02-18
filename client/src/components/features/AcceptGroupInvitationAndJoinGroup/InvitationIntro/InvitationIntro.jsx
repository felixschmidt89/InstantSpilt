/**
 * Component to introduce users to InstantSplit when they receive an invitation.
 *
 * @param {Object} props - React props.
 * @param {Object} props.groupData - groupData
 * @returns {JSX.Element} React component. */
import React from "react";
import styles from "./InvitationIntro.module.css";

const InvitationIntro = ({ groupData }) => {
  return (
    <div className={styles.container}>
      <p className={styles.paragraph}>
        Someone invited you to join the InstantSplit{" "}
        <span className={styles.noWrap}>
          group{" "}
          <span>
            <strong>{groupData.group.groupName}</strong>
          </span>
        </span>{" "}
        to manage and settle your shared expenses.
      </p>
    </div>
  );
};

export default InvitationIntro;
