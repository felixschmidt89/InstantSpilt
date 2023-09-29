import React from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton({ route, buttonText }) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(`/${route}`);
  };

  return (
    <button
      onClick={handleNextClick}
      style={{ marginLeft: "10px", padding: "2px" }}>
      {buttonText}
    </button>
  );
}

export default NavigateButton;
