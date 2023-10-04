import React from "react";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import { useNavigate, useParams } from "react-router-dom";
import removeActiveGroupCodeFromLocalStorage from "../../helpers/removeActiveGroupCodeFromLocalStorage";
import styles from "./ForgetGroupOnDevicePage.module.css";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    removeActiveGroupCodeFromLocalStorage();
    navigate("/homepage");
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
      <button className={styles.button} onClick={handleConfirm}>
        Confirm
      </button>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
