// React and Third-Party Libraries
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";

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
import { buttonStyles } from "../../constants/stylesConstants";

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
        <h1>delete group from device</h1>

        <div className={styles.groupCode}>
          <span className={styles.explainGroupCode}>
            If you ever wish to rejoin {groupName} later, remember its{" "}
            groupCode:
          </span>
        </div>
        <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"12rem"} />

        <div className={styles.buttonContainer}>
          <Button
            style={buttonStyles}
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
