// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Constants and Utils
import {
  deleteApplicationDataFromLocalStorage,
  deleteGroupDataFromLocalStorage,
  getFirstGroupCodeInStoredGroupCodesArray,
  setGroupCodeToCurrentlyActive,
} from "../../utils/localStorageUtils";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./ForgetGroupOnDevicePage.module.css";
import ConfirmationModal from "../../components/common/ConfirmationModal/ConfirmationModal";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleDelete = () => {
    deleteApplicationDataFromLocalStorage();
    deleteGroupDataFromLocalStorage(groupCode);
    const newGroupCode = getFirstGroupCodeInStoredGroupCodesArray();
    setGroupCodeToCurrentlyActive(newGroupCode);
    navigate("/instant-split");
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
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
          <button className={styles.button} onClick={handleShowConfirmation}>
            Confirm
          </button>
          {isConfirmationVisible && (
            <ConfirmationModal
              message={`Are you sure you want to forget the group on this device?`}
              onConfirm={handleDelete}
              onCancel={handleHideConfirmation}
              isVisible={isConfirmationVisible}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default ForgetGroupOnDevicePage;
