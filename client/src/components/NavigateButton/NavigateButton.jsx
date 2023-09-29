import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavigateButton.module.css";

export default function NavigateButton({ route, buttonText }) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  return (
    <button className={styles.button} onClick={handleNextClick}>
      {buttonText}
    </button>
  );
}
