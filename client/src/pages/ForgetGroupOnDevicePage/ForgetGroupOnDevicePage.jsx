import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import styles from "./ForgetGroupOnDevicePage.module.css";
import {
  removeActiveGroupCodeFromLocalStorage,
  removeActiveGroupCodeFromStoredGroupCodes,
  removeViewStateFromLocalStorage,
} from "../../utils/localStorageUtils";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

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
      <HelmetMetaTagsNetlify title='InstantSplit - forget group on this device' />
      <PiratePx COUNT_IDENTIFIER={"forget-group"} />
      <InAppNavigationBar back={true} />

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h1>Forget group on this device</h1>
          <p>
            Are you sure you want to leave <strong>{groupName}</strong> on this
            device?
          </p>
          <div>
            <p>
              If you ever wish to rejoin later, remember your{" "}
              <strong>GroupCode:</strong>
            </p>
            <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"12rem"} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
