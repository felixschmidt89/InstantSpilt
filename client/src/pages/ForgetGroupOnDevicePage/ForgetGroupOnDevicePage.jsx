import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import removeActiveGroupCodeFromLocalStorage from "../../helpers/removeActiveGroupCodeFromLocalStorage";
import styles from "./ForgetGroupOnDevicePage.module.css";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";

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
        device?
      </p>
      <p>
        If you ever wish to rejoin later, remember your{" "}
        <strong>GroupCode:</strong>
        <CopyToClipboard infoToCopy={groupCode} />
      </p>{" "}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
