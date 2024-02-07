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
      <p className={styles.explanation}>
        Be sure to store the groupCode somewhere save to avoid losing access to
        this group (you can view it at any time within the application).
        <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
      </p>
    </div>
  );
};

export default OnboardingGroupCodeExplanation;
