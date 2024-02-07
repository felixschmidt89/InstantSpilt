// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./ReactIconNavigate.module.css";

/**
 * ReactIconNavigate component rendering react-icons that allow either navigating to a specified route or performing an onClick function.
 *
 * @param {Object} props - The component props.
 * @param {string} props.route - The route to navigate to.
 * @param {Function} props.onClick - The callback function for the icon.
 * @param {React.Component} props.icon - The React icon component to render.
 * @param {string} props.iconSize - The font size of the icon in rem unit. Defaults to 2.5.
 *  @param {string} props.containerHeight - The height of the container in rem unit. Defaults to 5.

 * s@param {string} props.explanationText - The icon description text rendered below the component. Only rendered if given.
 * @param {string} props.marginRight - The margin right for the icon in rem unit.
 * @param {string} props.tooltip - The tooltip text to display on hover.
 * @param {string} props.tooltipFontSize - The font size of the tooltip text in rem units.
 * @param {string} props.email - The email address to open in the default email client.
 * @param {string} props.url - The URL to open in a new tab.
 * @param {boolean} props.cursorPointer - Whether the icon should have a pointer cursor. Defaults to true.
 * @param {number} props.translateY - The vertical translation of the icon in rem unit.
 * @param {number} props.tooltipBottom - The distance of the tooltip from the bottom of the icon as percentage. Default is 100.
 *  @param {number} props.hoverEnabled - Whether icon and text should hover. Defaults to true.

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
  tooltip,
  tooltipFontSize = "1.6",
  email,
  url,
  cursorPointer = true,
  translateY = 0,
  tooltipBottom = 100,
  hoverEnabled = true,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const navigate = useNavigate();

  const handleIconClick = () => {
    // Hide tooltip after 1 second if still visible (e.g. when clicking on the icon on mobile)
    setTimeout(() => {
      setIsTooltipVisible(false);
    }, 1000);

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
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onClick={handleIconClick}>
      {isTooltipVisible && tooltip && (
        <div
          className={styles.tooltip}
          style={{
            fontSize: `${tooltipFontSize}rem`,
            bottom: `${tooltipBottom}%`,
          }}>
          {tooltip}
        </div>
      )}
      {/* Render React icon */}
      <IconComponent
        className={styles.customIcon}
        style={{
          fontSize: `${iconSize}rem`,
          marginRight: `${marginRight}rem`,
          cursor: cursorPointer ? "pointer" : "default",
          transform: `translateY(${translateY}rem) scale(${iconScale})`,
        }}
      />
      <span className={styles.iconExplanation}>{explanationText}</span>
    </div>
  );
};

export default ReactIconNavigate;
