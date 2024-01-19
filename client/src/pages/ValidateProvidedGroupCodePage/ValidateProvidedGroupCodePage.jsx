// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";

// Hooks
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./ValidateProvidedGroupCodePage.module.css";
import ReactIconNavigate from "../../components/common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

/**
 * Validates the user's manually provided groupCode and navigates the user accordingly.
 *
 * @returns {JSX.Element} React component. */
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
      // Render feedback, programmatically navigate with a short delay
      const timeoutId = setTimeout(() => {
        navigate("/onboarding-tutorial/");
      }, 4000);
      return () => clearTimeout(timeoutId);
    } else if (validationError) {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - validate groupCode' />
      <PiratePx COUNT_IDENTIFIER={"groupCode-validator"} />
      <InAppNavigationBar
        back={true}
        backRoute={"/onboarding-enter-groupcode"}
        home={true}
        homeRoute={"/"}
      />
      <div className={styles.container}>
        <h1>GroupCode validation</h1>
        {groupExists && (
          <div className={styles.groupExists}>
            <ReactIconNavigate
              icon={IoMdCheckmarkCircleOutline}
              cursorPointer={false}
              iconSize={2}
              translateY={0.5}
            />
            <p>Valid GroupCode, redirecting to the group now.</p>
          </div>
        )}
        {/*Handle validations timeout errors*/}
        {!error && !groupExists && <Spinner />}
        <ErrorDisplay error={error} remWidth={25} />
      </div>
    </main>
  );
};
export default ValidateProvideGroupCodePage;
