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
      <div className={styles.explanation}>
        <div>
          Be sure to store your <strong>groupCode</strong> somewhere save to
          avoid losing access:
        </div>
        <div className={styles.groupCode}>
          <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"15rem"} />
        </div>
      </div>
    </div>
  );
};

export default OnboardingGroupCodeExplanation;
