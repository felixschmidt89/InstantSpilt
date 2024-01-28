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
 * @param {Function} props.onClick - The onClick function for the icon.
 * @param {React.Component} props.icon - The React icon component to render.
 * @param {string} props.iconSize - The font size of the icon in rem units.
 * @param {string} props.marginRight - The margin right for the icon in rem units.
 * @param {string} props.tooltip - The tooltip text to display on hover.
 * @param {string} props.tooltipFontSize - The font size of the tooltip text in rem units.
 * @param {string} props.email - The email address to open in the default email client.
 * @param {string} props.url - The URL to open in a new tab.
 * @param {boolean} props.cursorPointer - Whether the icon should have a pointer cursor. Default is true.
 * @param {number} props.translateY - The vertical translation of the icon in rem units.
 * @param {number} props.tooltipBottom - The distance of the tooltip from the bottom of the icon as a percentage. Default is 100.
 * @returns {React.Component} The rendered ReactIconNavigate component.
 */
const ReactIconNavigate = ({
  route,
  onClick,
  icon: IconComponent,
  iconSize = "2.5",
  marginRight = "0",
  tooltip,
  tooltipFontSize = "1.6",
  email,
  url,
  cursorPointer = true,
  translateY = 0,
  tooltipBottom = 100,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
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
      className={styles.iconContainer}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}>
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
      {/* Render React icon  */}
      <IconComponent
        onClick={handleIconClick}
        className={styles.customIcon}
        style={{
          fontSize: `${iconSize}rem`,
          marginRight: `${marginRight}rem`,
          cursor: cursorPointer ? "pointer" : "default",
          transform: `translateY(${translateY}rem)`,
        }}
      />
    </div>
  );
};

export default ReactIconNavigate;
