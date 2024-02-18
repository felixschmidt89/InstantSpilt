// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";
import { devLog } from "../../utils/errorUtils";

// Hooks
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./ValidateProvidedGroupCodePage.module.css";

/**
 * Validates the user's manually provided groupCode and navigates the user accordingly.
 *
 * @returgroupExistsns {JSX.Element} React component. */
const ValidateProvideGroupCodePage = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const [error, setError] = useState(null);
  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited"
  );

  // Check if current user has entered code from within main application, ie is redirected from manage-groups route
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const isInstantSplitUser = previousRoute.includes("/manage-groups");
  if (isRetrieved) {
    devLog("Current user is InstantSplit user:", isInstantSplitUser);
  }

  useEffect(() => {
    if (groupExists) {
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);

      // Render feedback and programmatically navigate with a delay
      const timeoutId = setTimeout(
        () => {
          navigate(
            isInstantSplitUser ? "/instant-split" : "/onboarding-tutorial/"
          );
        },
        isInstantSplitUser ? 2500 : 4000
      );

      return () => clearTimeout(timeoutId);
    } else if (validationError) {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError, isInstantSplitUser]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - validate groupCode' />
      <PiratePx COUNT_IDENTIFIER={"groupCode-validator"} />
      {isInstantSplitUser ? (
        <InAppNavigationBar
          back={true}
          backRoute={"/manage-groups"}
          home={true}
          homeRoute={"/instant-split"}
        />
      ) : (
        <InAppNavigationBar
          back={true}
          backRoute={"/onboarding-enter-groupcode"}
          home={true}
          homeRoute={"/"}
        />
      )}
      <div className={styles.container}>
        <h1>GroupCode validation</h1>
        {groupExists && (
          <div className={styles.groupExists}>
            <div className={styles.feedbackIcon}>
              <IoMdCheckmarkCircleOutline />
            </div>
            <p>Valid GroupCode, redirecting to the group now.</p>
          </div>
        )}
        {/*Handle validations timeout errors*/}
        {!error && !groupExists && <Spinner />}
        {error && (
          <div className={styles.groupDoesNotExist}>
            <div className={styles.feedbackIcon}>
              <IoMdCloseCircleOutline />
            </div>
            <ErrorDisplay error={error} remWidth={30} errorFontColor={true} />
          </div>
        )}
      </div>
    </main>
  );
};
export default ValidateProvideGroupCodePage;
