// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./GetStartedSection.module.css";
import RouteButton from "../../../common/InAppNavigation/RouteButton/RouteButton";

/**
 * Component for rendering the get started section on the home page.
 *
 * @returns {JSX.Element} React component. */
const GetStartedSection = () => {
  return (
    <>
      <div className={styles.groupContainer}>
        <h2>get started</h2>
        <RouteButton
          route={`onboarding-create-group`}
          buttonText='create new group'
        />
        <RouteButton
          route={`onboarding-enter-groupcode`}
          buttonText='join existing group'
        />
      </div>
    </>
  );
};

export default GetStartedSection;
