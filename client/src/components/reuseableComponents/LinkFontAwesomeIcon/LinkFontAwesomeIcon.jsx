import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./LinkFontAwesomeIcon.module.css";

/**
 * Reusable component that renders a FontAwesome icon to link to a URL in a new tab or send an email
 *
 * @param {object} props.icon - The FA icon, to be imported from from @fortawesome/free-solid-svg-icons
 * @param {string} props.tooltip - The tooltip text to display on hover.
 * @param {string} props.url - The URL to open when the icon is clicked (for regular links).
 * @param {string} props.email - The recipient email address when the icon is clicked (for email links).
 *
 * @returns {JSX.Element} The rendered component.
 */
const LinkFontAwesomeIcon = ({ icon, tooltip, url, email }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleIconClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div
      className={styles.iconContainer}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
      <FontAwesomeIcon
        icon={icon}
        onClick={handleIconClick}
        className={styles.icon}
      />
      {tooltip && showTooltip && (
        <div className={styles.tooltip}>{tooltip}</div>
      )}
    </div>
  );
};

export default LinkFontAwesomeIcon;
