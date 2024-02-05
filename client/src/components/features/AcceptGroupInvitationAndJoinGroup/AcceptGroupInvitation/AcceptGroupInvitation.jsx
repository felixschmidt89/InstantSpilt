// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../../../utils/localStorageUtils";

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
      <h2>Are you in?</h2>
      <button className={styles.button} onClick={handleAcceptInvitation}>
        Sure!
      </button>
    </div>
  );
};

export default AcceptGroupInvitation;
