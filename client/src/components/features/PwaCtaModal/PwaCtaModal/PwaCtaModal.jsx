import React from "react";
import { Button } from "@mui/material";
import { smallButtonStyles } from "../../../../constants/stylesConstants";
import styles from "./PwaCtaModal.module.css";
import RenderInstallPwaCta from "../RenderInstallPwaCta/RenderInstallPwaCta";
import { setPwaCtaClosedInLocalStorage } from "../../../../utils/localStorageUtils";

const PwaCtaModal = ({ displayPrompt, closePrompt, setIsCtaModalVisible }) => {
  const closeCtaModal = () => {
    setPwaCtaClosedInLocalStorage();
    setIsCtaModalVisible(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} onClick={handleModalClick}>
        <>
          <RenderInstallPwaCta
            displayPrompt={displayPrompt}
            closePrompt={closePrompt}
            setIsCtaModalVisible={setIsCtaModalVisible}
          />
          <Button
            style={smallButtonStyles}
            variant='outlined'
            onClick={closeCtaModal}
            color='grey'>
            ok
          </Button>
        </>
      </div>
    </div>
  );
};

export default PwaCtaModal;
