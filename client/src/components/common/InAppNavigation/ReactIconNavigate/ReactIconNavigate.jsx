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
 * @param {number} props.fontSize - The size of the icon in rem units.
 * @param {React.Component} props.icon - The React icon component to render.
 * @param {string} props.marginTop - The margin top for the icon in rem units.
 * @param {string} props.marginRight - The margin right for the icon in rem units.
 * @param {string} props.tooltip - The tooltip text to display on hover.
 * @param {number} props.tooltipFontSize - The size of the tooltip text in rem units.
 * @param {string} props.email - The email address to open in the default email client.
 * @param {string} props.url - The URL to open in a new tab.
 * @returns {React.Component} The rendered ReactIconNavigate component.
 */
const ReactIconNavigate = ({
  route,
  onClick,
  fontSize = "2.5rem",
  icon: IconComponent,
  marginTop = "0.5rem",
  marginRight = "0",
  tooltip,
  tooltipFontSize = "1.6rem",
  email,
  url,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const navigate = useNavigate();

  const navigateToRoute = () => {
    navigate(route);
  };

  const handleIconClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else if (url) {
      window.open(url, "_blank");
    } else {
      onClick || navigateToRoute();
    }
  };

  return (
    <div
      className={styles.iconContainer}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}>
      {isTooltipVisible && tooltip && (
        <div className={styles.tooltip} style={{ fontSize: tooltipFontSize }}>
          {tooltip}
        </div>
      )}
      {/* Render React icon  */}
      <IconComponent
        onClick={handleIconClick}
        className={styles.customIcon}
        style={{
          fontSize: fontSize,
          marginTop: marginTop,
          marginRight: marginRight,
        }}
      />
    </div>
  );
};

export default ReactIconNavigate;
