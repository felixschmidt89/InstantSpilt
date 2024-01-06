import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import styles from "./ForgetGroupOnDevicePage.module.css";
import {
  removeActiveGroupCodeFromLocalStorage,
  removeActiveGroupCodeFromStoredGroupCodes,
  removeViewStateFromLocalStorage,
} from "../../utils/localStorageUtils";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();

  const handleConfirm = () => {
    removeActiveGroupCodeFromStoredGroupCodes(groupCode);
    removeActiveGroupCodeFromLocalStorage();
    removeViewStateFromLocalStorage();
    navigate("/homepage");
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - forget group on device' />
      <PiratePx COUNT_IDENTIFIER={"leave-group"} />
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
