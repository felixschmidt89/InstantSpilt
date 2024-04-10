// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../../../utils/localStorageUtils";
import { buttonStyles } from "../../../../constants/stylesConstants";

// Components
import TermsAndConditionsSection from "../../Home/TermsAndConditionsSection/TermsAndConditionsSection";

// Styles
import styles from "./AcceptGroupInvitation.module.css";

type AcceptGroupInvitationProps = {
  groupName: string;
  groupCode: string;
};

/**
 * Component for rendering group invitation with ability to accept and navigate to terms and conditions page.
 */
const AcceptGroupInvitation = ({
  groupName,
  groupCode,
}: AcceptGroupInvitationProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAcceptInvitation: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    storeGroupCodeInLocalStorage(groupCode);
    setGroupCodeToCurrentlyActive(groupCode);
    navigate("/instant-split");
  };

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button
          style={buttonStyles}
          onClick={handleAcceptInvitation}
          variant='outlined'>
          {t("join-group-button-text")}
        </Button>
      </div>
      <div className={styles.termsAndConditions}>
        <TermsAndConditionsSection />
      </div>
    </div>
  );
};

export default AcceptGroupInvitation;
