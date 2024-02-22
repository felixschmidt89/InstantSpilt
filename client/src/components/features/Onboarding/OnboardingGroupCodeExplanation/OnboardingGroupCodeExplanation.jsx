// React and Third-Party Libraries
import React from "react";

// Components
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./OnboardingGroupCodeExplanation.module.css";

/**
 * Component for rendering the group code explanation for group creators during onboarding.
 * @param {string} groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} React component.
 */
const OnboardingGroupCodeExplanation = ({ groupCode }) => {
  return (
    <div className={styles.container}>
      <h2>security</h2>
      <ul className={styles.explanation}>
        <li>
          Be sure to store your <strong>groupCode</strong> somewhere save to
          avoid losing access:
        </li>
        <li className={styles.groupCode}>
          <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"11rem"} />
        </li>
      </ul>
    </div>
  );
};

export default OnboardingGroupCodeExplanation;
