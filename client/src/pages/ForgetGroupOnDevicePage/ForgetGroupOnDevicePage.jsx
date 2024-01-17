// React and Third-Party Libraries
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Constants and Utils
import {
  deleteApplicationDataFromLocalStorage,
  deleteGroupDataFromLocalStorage,
} from "../../utils/localStorageUtils";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./ForgetGroupOnDevicePage.module.css";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();

  const handleConfirmation = () => {
    deleteApplicationDataFromLocalStorage();
    deleteGroupDataFromLocalStorage(groupCode);
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
            <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleConfirmation}>
            Confirm
          </button>
        </div>
      </div>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
