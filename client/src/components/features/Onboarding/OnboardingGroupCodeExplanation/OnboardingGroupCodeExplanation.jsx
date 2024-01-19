// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";

// Components
import CopyToClipboard from "../../../common/CopyToClipboard/CopyToClipboard";
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./OnboardingGroupCodeExplanation.module.css";

/**
 * Component for rendering groupCode explanation for group creators during onboarding.
 * @param {string} groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} React component. */
const OnboardingGroupCodeExplanation = ({ groupCode }) => {
  return (
    <div className={styles.container}>
      <h1>Crucial info for group creators</h1>
      <div className={styles.presentGroupCode}>
        <p>
          The key to settling group expenses easily while sharing minimal data
          is the <span className={styles.strong}>GroupCode</span>. Here&rsquo;s
          yours:
        </p>
        <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
      </div>
      <div className={styles.saveGroupCode}>
        <p>Be sure to write it down in a safe place.</p>
        <div>
          Alternatively, bookmark the invitation link{" "}
          <span className={styles.noWrap}>
            (
            <ReactIconNavigate
              iconSize={"1.7"}
              icon={IoPersonAddOutline}
              cursorPointer={false}
              translateY={0.3}
            />
            )
          </span>{" "}
          in the top section of the main application to avoid losing access to
          your group on this device.
        </div>
      </div>
    </div>
  );
};

export default OnboardingGroupCodeExplanation;
