import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import removeActiveGroupCodeFromLocalStorage from "../../helpers/removeActiveGroupCodeFromLocalStorageHelper";
import styles from "./ForgetGroupOnDevicePage.module.css";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";
import removeActiveGroupCodeFromStoredGroupCodesHelper from "../../helpers/removeActiveGroupCodeFromStoredGroupCodesHelper";
import removeViewStateFromLocalStorageHelper from "../../helpers/removeViewStateFromLocalStorageHelper";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    removeActiveGroupCodeFromStoredGroupCodesHelper(groupCode);
    removeActiveGroupCodeFromLocalStorage();
    removeViewStateFromLocalStorageHelper();
    navigate("/homepage");
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Forget group' />
      <PiratePx COUNT_IDENTIFIER={"leave-group/:groupName/:groupCode"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <div className={styles.contentContainer}>
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
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
