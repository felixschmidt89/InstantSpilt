import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RouteButton.module.css";

export default function RouteButton({
  route,
  buttonText = "update",
  margin = "10px",
}) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  const buttonStyle = { margin };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleNextClick}
        style={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
}
