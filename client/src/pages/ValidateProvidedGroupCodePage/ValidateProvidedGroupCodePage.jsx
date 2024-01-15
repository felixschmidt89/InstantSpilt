import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import emojiConstants from "../../constants/emojiConstants";
import {
  setGroupCodeToCurrentlyActive,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import styles from "./ValidateProvidedGroupCodePage.module.css";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

const ValidateProvideGroupCodePage = () => {
  const { groupCode } = useParams();
  console.log(groupCode);
  const [error, setError] = useState(null);
  // Destructure groupExists and status code from groupCode validity check
  const { groupExists, error: validationError } = useValidateGroupExistence(
    groupCode,
    "limited"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (groupExists === true) {
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);
      navigate("/onboarding-tutorial/");
    } else if (groupExists === false) {
      setError(
        "Oops, there's no group associated with the provided GroupCode."
      );
    } else {
      setError(validationError);
    }
  }, [groupExists, groupCode, navigate, validationError]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - validate groupCode' />
      <PiratePx COUNT_IDENTIFIER={"groupCode-validator"} />

      <InAppNavigationBar back={true} backRoute={"/enter-groupcode"} />
      <div className={styles.container}>
        <h1>GroupCode Validation</h1>
        {groupExists === false && !error && (
          <div>
            <p className={styles.errorMessage}>
              {emojiConstants.error} Oops, there&rsquo;s no group associated
              with the provided <strong>GroupCode</strong>.
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
