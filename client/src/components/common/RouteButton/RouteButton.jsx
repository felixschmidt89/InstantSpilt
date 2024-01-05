import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RouteButton.module.css";

/**
 * Button that navigates to a specified route.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {string} props.route - The route to navigate to when the button is clicked.
 * @param {string} [props.buttonText="update"] - The text content of the button.
 * @param {string} [props.margin="1rem"] - The margin applied to the button in rem units.
 * @returns {JSX.Element} - The rendered RouteButton component.
 */
export default function RouteButton({
  route,
  buttonText = "update",
  margin = "1rem",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${route}`);
  };

  // Style object for setting the margin of the button
  const buttonStyle = { margin };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleClick}
        style={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
}
