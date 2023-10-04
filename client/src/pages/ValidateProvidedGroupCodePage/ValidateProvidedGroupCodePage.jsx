// DONE adding only meaningful necessary comments

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./ValidateProvidedGroupCodePage.module.css";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import { StatusCodes } from "http-status-codes";
import emojiConstants from "../../constants/emojiConstants";

/**
 * Checks if the user-entered groupCode exists in the database. If it stores the groupCode in the client's local storage and navigates to the main application.
 *
 * If the groupCode is not found, it renders a "NOT_FOUND" error message.
 * If there are too many requests, it renders a "TOO_MANY_REQUESTS" error message.
 * For all other errors, it displays a generic error message.
 */

const ValidateProvideGroupCodePage = () => {
  // Get groupCode from URL, initiate groupCode validation, destructure groupExistence boolea and statusCode.
  const { groupCode } = useParams();
  const [error, setError] = useState(null);
  const [groupExists, , statusCode] = useValidateGroupExistence({
    groupCode,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (groupExists === true) {
      storeGroupCodesInLocalStorageHelper(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      navigate("/instant-split");
    } else if (statusCode === StatusCodes.TOO_MANY_REQUESTS) {
      setError(
        `${emojiConstants.error} Too many requests. Please try again later.`
      );
    } else if (statusCode === StatusCodes.NOT_FOUND) {
      setError(
        `${emojiConstants.error} Oops, there's no group associated with the provided GroupCode.`
      );
    } else {
      setError(
        `${emojiConstants.error}An error occurred. Please try again later.`
      );
    }
  }, [groupExists, groupCode, navigate, statusCode]);

  return (
    <main>
      <NavigateButton
        route={"enter-groupcode"}
        buttonText={"back"}
        alignment={"left"}
      />
      <div className={styles.container}>
        <h1>GroupCode Validation</h1>
        {error && <div>{error}</div>}
        {groupExists === false && !error && (
          <div>
            <p className={styles.errorMessage}>
              {emojiConstants.error} Oops, there's no group associated with the
              provided <strong>GroupCode</strong>.
            </p>
            <Link to='/homepage'>Go to main</Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default ValidateProvideGroupCodePage;
