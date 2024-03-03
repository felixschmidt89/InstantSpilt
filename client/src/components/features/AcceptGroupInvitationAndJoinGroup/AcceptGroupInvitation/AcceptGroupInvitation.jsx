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

/**
 * Component to render and accept a group invitation.
 *
 * @param {Object} props - React props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.groupCode - The code of the group.
 * @returns {JSX.Element} React component. */
const AcceptGroupInvitation = ({ groupName, groupCode }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleAcceptInvitation = () => {
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
          variant='contained'>
          {t("join-group-button-text", { groupName })}
        </Button>
      </div>
      <div className={styles.termsAndConditions}>
        <TermsAndConditionsSection />
      </div>
    </div>
  );
};

export default AcceptGroupInvitation;
