import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReactIconNavigate.module.css";

/**
 * ReactIconNavigate component rendering react-icons that allow either navigating to a specified route or performing an onClick function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.route - The route to navigate to.
 * @param {Function} props.onClick - The callback function for the icon.
 * @param {React.Component} props.icon - The React icon component to render.
 * @param {string} props.iconSize - The font size of the icon in rem unit. Defaults to "2.5".
 * @param {number} props.iconScale - The scale factor for the icon. Defaults to 1.
 * @param {string} props.containerHeight - The height of the container in rem unit. Defaults to "5".
 * @param {string} props.containerWidth - The width of the container in rem unit. Defaults to "5".
 * @param {string} props.marginRight - The margin right for the icon in rem unit. Defaults to "0".
 * @param {string} props.email - The email address to open in the default email client.
 * @param {string} props.url - The URL to open in a new tab.
 * @param {boolean} props.cursorPointer - Whether the icon should have a pointer cursor. Defaults to true.
 * @param {number} props.translateY - The vertical translation of the icon in rem unit. Defaults to 0.
 * @param {number} props.translateX - The horizontal translation of the icon in rem unit. Defaults to 0.
 * @param {boolean} props.hoverEnabled - Whether icon and text should hover. Defaults to true.
 * @param {string} props.explanationText - The icon description text rendered below the component.
 *
 * @returns {React.Component} React component.
 */

const ReactIconNavigate = ({
  route,
  onClick,
  icon: IconComponent,
  explanationText,
  iconSize = "2.5",
  iconScale = 1,
  containerHeight = "5",
  containerWidth = "5",
  marginRight = "0",
  email,
  url,
  cursorPointer = true,
  translateY = 0,
  translateX = 0,
  hoverEnabled = true,
  fontWeight = 400,
}) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else if (url) {
      window.open(url, "_blank");
    } else {
      // Check if onClick is a function before invoking it
      if (typeof onClick === "function") {
        onClick();
      } else {
        navigate(route);
      }
    }
  };

  return (
    <div
      className={`${styles.iconContainer} ${hoverEnabled ? styles.hover : ""}`}
      style={{
        height: `${containerHeight}rem`,
        width: `${containerWidth}rem`,
      }}
      onClick={handleIconClick}>
      <IconComponent
        className={styles.customIcon}
        style={{
          fontSize: `${iconSize}rem`,
          marginRight: `${marginRight}rem`,
          cursor: cursorPointer ? "pointer" : "default",
          transform: `translate(${translateX}rem, ${translateY}rem) scale(${iconScale})`,
        }}
      />
      <span className={styles.iconExplanation}>{explanationText}</span>
    </div>
  );
};

export default ReactIconNavigate;
