// React and Third-Party Libraries
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      <HelmetMetaTagsNetlify title={t("forget-group-on-device-page-title")} />
      <PiratePx COUNT_IDENTIFIER={"forget-group"} />
      <InAppNavigationBar back={true} />
      <h1 className={styles.header}>
        {t("forget-group-on-device-page-header")}
      </h1>
      <div className={styles.container}>
        <div className={styles.groupCodeContainer}>
          <div className={styles.groupCodeExplanation}>
            {t("forget-group-on-device-groupcode-explanation", { groupName })}
          </div>
          <div className={styles.copyGroupCode}>
            <CopyToClipboard infoToCopy={groupCode} inputFieldWidth={"15rem"} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            style={buttonStyles}
            variant='contained'
            color='error'
            onClick={handleShowConfirmation}
            endIcon={<ExitToAppIcon />}>
            {t("forget-group-on-device-page-header")}
          </Button>
          {isConfirmationVisible && (
            <ConfirmationModal
              message={t("forget-group-on-device-confirmation-message")}
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
