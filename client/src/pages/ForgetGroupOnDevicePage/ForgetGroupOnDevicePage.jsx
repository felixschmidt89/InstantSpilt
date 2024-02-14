// React and Third-Party Libraries
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
import { Button } from "@mui/material";

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
          <h1>delete group from device</h1>
          <div>
            <p>
              If you ever wish to rejoin <strong>{groupName}</strong> later,
              remember its <strong>groupCode:</strong>
            </p>
            <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"10rem"} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            style={{
              padding: "0.2rem 0.5rem",
              fontSize: "1.6rem",
              marginTop: "0.5rem",
              fontFamily: "inherit",
            }}
            variant='contained'
            color='error'
            onClick={handleShowConfirmation}
            endIcon={<ExitToAppIcon />}>
            leave group
          </Button>
          {isConfirmationVisible && (
            <ConfirmationModal
              message={`Are you sure you want to delete the group from this device?`}
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
