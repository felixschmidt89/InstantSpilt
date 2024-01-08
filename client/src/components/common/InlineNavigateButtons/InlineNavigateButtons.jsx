import React from "react";
import NavigateButton from "../NavigateButton/NavigateButton";
import styles from "./InlineNavigateButtons.module.css";

/**
 * Displays a list of NavigateButton components in a horizontal layout.
 *
 * @param {Object[]} buttonData - An array of button props for NavigateButton components:
 *   [
 *     {
 *       route: string, // The route to navigate to when the button is clicked.
 *       buttonText: string, // The text to display on the button.
 *       alignment: "left" | "right", // The alignment of the button within the container (left, center, or right).
 *       margin: string, // The margin around the button (e.g., "5px").
 *     },
 *     (additional button objects)
 *   ]
 */
const InlineNavigateButtons = ({ buttonData }) => {
  return (
    <div className={styles.buttonContainer}>
      {buttonData.map((buttonProps, index) => (
        <NavigateButton key={index} {...buttonProps} />
      ))}
    </div>
  );
};
export default InlineNavigateButtons;
