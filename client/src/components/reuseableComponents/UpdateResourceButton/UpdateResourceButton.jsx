import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateResourceButton.module.css";

export default function UpdateResourceButton({
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
