/**
 * Component to introduce users to InstantSplit when they receive an invitation.
 *
 * @component
 * @param {Object} props - React props.
 * @param {Object} props.groupData - groupData
 * @returns {JSX.Element} - Rendered component.
 */
import React from "react";
import styles from "./InstantSplitIntroduction.module.css";

const InstantSplitIntroduction = ({ groupData }) => {
  return (
    <div className={styles.container}>
      <h1>Hey there!</h1>
      <p className={styles.paragraph}>
        Someone invited you to join the InstantSplit{" "}
        <span className={styles.noWrap}>
          group{" "}
          <span className={styles.strong}>{groupData.group.groupName}</span>.
        </span>
      </p>
      <p className={styles.paragraph}>
        InstantSplit is the hassle-free way to settle group expenses with no
        user registration or app download while sharing minimal data:
      </p>
      <p className={styles.strong}>
        <span className={styles.noWrap}>No cookies.</span>{" "}
        <span className={styles.noWrap}>No visitors tracking.</span>{" "}
        <span className={styles.noWrap}>No monetization.</span>{" "}
        <span className={styles.noWrap}>Ever.</span>
      </p>
    </div>
  );
};

export default InstantSplitIntroduction;
