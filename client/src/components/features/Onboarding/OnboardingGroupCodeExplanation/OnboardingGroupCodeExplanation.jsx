// React and Third-Party Libraries
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

// Components
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";

// Styles
import styles from "./OnboardingGroupCodeExplanation.module.css";

/**
 * Component for rendering groupCode explanation for group creators during onboarding.
 * @component
 * @param {string} groupCode - The GroupCode for identifying a group.
 * @returns {JSX.Element} - OnboardingGroupCodeExplanation component
 */
const OnboardingGroupCodeExplanation = ({ groupCode }) => {
  return (
    <div className={styles.container}>
      <h1>Crucial info for group creators</h1>
      <div className={styles.presentGroupCode}>
        <p>
          The key to settling group expenses easily while sharing minimal data
          is the <strong>GroupCode</strong>. Here&rsquo;s yours:
        </p>
        <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"12rem"} />
      </div>
      <div className={styles.saveGroupCode}>
        <p>Be sure to write it down in a safe place.</p>
        <p>
          Alternatively, bookmark the invitation link (
          <FontAwesomeIcon icon={faUserPlus} />) in the top section of the main
          application to avoid losing access to your group on this device.
        </p>
      </div>
    </div>
  );
};

export default OnboardingGroupCodeExplanation;
