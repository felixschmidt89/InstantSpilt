// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";
import { genericErrorMessage } from "../../constants/errorConstants";

// Hooks
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./ValidateProvidedGroupCodePage.module.css";

/**
 * Validates the provided group code and navigates the user accordingly.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
const ValidateProvideGroupCodePage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const [error, setError] = useState(null);
  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited"
  );

  useEffect(() => {
    if (groupExists === true) {
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);
      setRouteInLocalStorage(window.location.pathname, "previousRoute");
      navigate("/onboarding-tutorial/");
    } else if (validationError) {
      setError(validationError);
    } else {
      setError(genericErrorMessage);
    }
  }, [groupExists, groupCode, navigate, validationError]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - validate groupCode' />
      <PiratePx COUNT_IDENTIFIER={"groupCode-validator"} />
      <InAppNavigationBar
        back={true}
        backRoute={"/enter-groupcode"}
        home={true}
        homeRoute={"/homepage"}
      />
      <div className={styles.container}>
        <h1>GroupCode validation</h1>
        {error && <ErrorDisplay error={error} remWidth={25} />}
      </div>
    </main>
  );
};
export default ValidateProvideGroupCodePage;
