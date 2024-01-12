// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoHomeOutline,
} from "react-icons/io5";

// Styles
import styles from "./InAppNavigationBar.module.css";

/**
 * InAppNavigationBar component for rendering navigation links within the application.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.forward - Indicates if it's a forward navigation. Defaults to false.
 * @param {string} props.forwardRoute - The route to navigate forward to.
 * @param {boolean} props.back - Indicates if it's a back navigation. Defaults to false.
 * @param {string} props.backRoute - The route to navigate backward to.
 * @param {boolean} props.home - Indicates if it's a navigation to the home page. Defaults to false.
 * @param {string} props.homeRoute - The route to navigate to the home page. Defaults to "/instant-split".
 * @returns {React.Component} The rendered InAppNavigation component.
 */
const InAppNavigationBar = ({
  forward = false,
  forwardRoute,
  back = false,
  backRoute,
  home = false,
  homeRoute = "/instant-split",
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (back) {
      navigate(backRoute);
    }
    if (home) {
      navigate(homeRoute);
    }
    if (forward) {
      navigate(forwardRoute);
    }
  };
  return (
    <div className={styles.navContainer} onClick={handleNavigation}>
      {back && <IoArrowBackCircleOutline className={styles.icon} />}
      {home && (
        <IoHomeOutline className={`${styles.homeIcon} ${styles.icon}`} />
      )}
      {forward && <IoArrowForwardCircleOutline className={styles.icon} />}
    </div>
  );
};

export default InAppNavigationBar;
