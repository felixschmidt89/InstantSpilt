// React and Third-Party Libraries
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Constants and Utils
import {
  deleteApplicationDataFromLocalStorage,
  deleteGroupDataFromLocalStorage,
  getFirstGroupCodeInStoredGroupCodesArray,
  setGroupCodeToCurrentlyActive,
} from "../../utils/localStorageUtils";

// Hooks
import useConfirmationModalLogicAndActions from "../../hooks/useConfirmationModalLogicAndActions";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ConfirmationModal from "../../components/common/ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./ForgetGroupOnDevicePage.module.css";

const ForgetGroupOnDevicePage = () => {
  const { groupName, groupCode } = useParams();
  const navigate = useNavigate();

  // Get confirmation modal logic from hook, pass callbacks to be executed on confirmation
  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions([
    () => deleteApplicationDataFromLocalStorage(),
    () => deleteGroupDataFromLocalStorage(groupCode),
    () => {
      const newGroupCode = getFirstGroupCodeInStoredGroupCodesArray();
      setGroupCodeToCurrentlyActive(newGroupCode);
    },
    () => {
      navigate("/instant-split");
    },
  ]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - forget group on this device' />
      <PiratePx COUNT_IDENTIFIER={"forget-group"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <h1>forget group on this device</h1>
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
              onConfirm={handleConfirmation}
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
