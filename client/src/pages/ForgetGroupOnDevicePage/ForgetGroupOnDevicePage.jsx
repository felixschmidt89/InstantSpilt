import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import removeActiveGroupCodeFromLocalStorage from "../../helpers/removeActiveGroupCodeFromLocalStorage";
import styles from "./ForgetGroupOnDevicePage.module.css";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    removeActiveGroupCodeFromLocalStorage();
    // Set viewState in local storage to default, so that the user sees the default view when (re-)joining a(nother) group
    localStorage.setItem("viewState", "view2");
    navigate("/homepage");
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Forget group' />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
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
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
