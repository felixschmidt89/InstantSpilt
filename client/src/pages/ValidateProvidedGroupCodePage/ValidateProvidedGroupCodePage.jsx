import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { StatusCodes } from "http-status-codes";
import emojiConstants from "../../constants/emojiConstants";
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import styles from "./ValidateProvidedGroupCodePage.module.css";

/**
 * Checks if groupCode exists in the database.
 * If found: stores the groupCode in the client's local storage and navigates to OnboardingPage.
 * If not: renders specific (NOT FOUND, TOO MANY REQUESTS) else generic error message
 */
const ValidateProvideGroupCodePage = () => {
  // Get groupCode from URL, initiate groupCode validation, and destructure groupExistence boolean and statusCode.
  const { groupCode } = useParams();

  const [error, setError] = useState(null);
  // Destructure groupExists and status code from groupCode validity check
  const [groupExists, , statusCode] = useValidateGroupExistence({
    groupCode,
    limited: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (groupExists === true) {
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);
      navigate("/onboarding/");
    } else if (groupExists === false) {
      setError(
        `Oops, there's no group associated with the provided GroupCode.`
      );
    } else if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
      setError(`Too many requests. Please try again later.`);
    }
  }, [groupExists, groupCode, navigate, statusCode]);

  return (
    <main>
      {/* Back button to enter groupCode again */}
      <HelmetMetaTagsNetlify title='InstantSplit - validate groupCode' />
      <PiratePx COUNT_IDENTIFIER={"groupCode-validator"} />
      <NavigateButton
        route={"enter-groupcode"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <div className={styles.container}>
        <h1>GroupCode Validation</h1>
        {groupExists === false && !error && (
          <div>
            <p className={styles.errorMessage}>
              {emojiConstants.error} Oops, there's no group associated with the
              provided <strong>GroupCode</strong>.
            </p>
            <Link to='/homepage'>Go to main</Link>
          </div>
        )}
        {error && (
          <div>
            <div className={styles.errorMessage}>
              {emojiConstants.error} {error}
            </div>
            <Link to='/homepage'>Go to main</Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ValidateProvideGroupCodePage;
