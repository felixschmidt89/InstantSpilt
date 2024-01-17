// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./RouteButton.module.css";
import { setRouteInLocalStorage } from "../../../../utils/localStorageUtils";

/**
 * Button for navigating to a specified route with optional setting of previousRoute or nestedPreviousRoute in localStorage (needed for InAppNavgationBar component)
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @param {string} [props.buttonText="update"] - The text content of the button.
 *  @param {boolean} props.setPreviousRoute - If true, sets the current page as previous route in localStorage.
 * @param {boolean} props.setNestedPreviousRoute - If true, sets sets the current page as nested previous route in localStorage.
 * @returns {JSX.Element} React component. */
const RouteButton = ({
  route,
  buttonText,
  setPreviousRoute,
  setNestedPreviousRoute,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setPreviousRoute) {
      setRouteInLocalStorage(window.location.pathname, "previousRoute");
    } else if (setNestedPreviousRoute) {
      setRouteInLocalStorage(window.location.pathname, "nestedPreviousRoute");
    }
    navigate(`/${route}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default RouteButton;
