import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./ValidateProvidedGroupCodePage.module.css";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import { StatusCodes } from "http-status-codes";
import emojiConstants from "../../constants/emojiConstants";

/**
 * Checks if groupCode exists in the database.
 * If found: it stores the groupCode in the client's local storage and navigates to OnboardingPage.
 * If not: renders specific (NOT FOUND, TOO MANY REQUESTS) else generic error message
 */
const ValidateProvideGroupCodePage = () => {
  // Get groupCode from URL, initiate groupCode validation, and destructure groupExistence boolean and statusCode.
  const { groupCode } = useParams();

  const [error, setError] = useState(null);
  // Destructure groupExists and status code from groupCode validity check
  const [groupExists, , statusCode] = useValidateGroupExistence({
    groupCode,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (groupExists === true) {
      storeGroupCodesInLocalStorageHelper(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      navigate("/onboarding");
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
      <NavigateButton
        route='enter-groupcode'
        buttonText='back'
        alignment='left'
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
