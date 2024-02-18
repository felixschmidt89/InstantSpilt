// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
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

  const handleAcceptInvitation = () => {
    storeGroupCodeInLocalStorage(groupCode);
    setGroupCodeToCurrentlyActive(groupCode);
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
    navigate("/onboarding-tutorial");
  };

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button
          style={buttonStyles}
          onClick={handleAcceptInvitation}
          variant='contained'>
          join {groupName}
        </Button>
      </div>
      <div className={styles.termsAndConditions}>
        <TermsAndConditionsSection />
      </div>
    </div>
  );
};

export default AcceptGroupInvitation;
