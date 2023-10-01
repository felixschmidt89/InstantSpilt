import React from "react";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import { useNavigate } from "react-router-dom";
import removeActiveGroupCodeFromLocalStorage from "../../helpers/removeActiveGroupCodeFromLocalStorage";

const ForgetGroupOnDevicePage = () => {
  const pathParts = window.location.pathname.split("/");

  const groupName = pathParts[pathParts.length - 2];
  const groupCode = pathParts[pathParts.length - 1];

  const navigate = useNavigate();

  const handleConfirm = () => {
    removeActiveGroupCodeFromLocalStorage();
    navigate("/homepage"); // Use the navigate function to go to the homepage
  };

  return (
    <main>
      <NavigateButton
        route='instant-split'
        buttonText='back'
        alignment='left'
      />
      <h1>Forget group on this device</h1>
      <p>
        Are you sure you want to leave <strong>{groupName}</strong> on this
        device? <br />
        If you ever wish to rejoin later, remember your GroupCode: <br />
        <strong>{groupCode}</strong>
      </p>{" "}
      <br />
      <button onClick={handleConfirm}>Confirm</button>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
