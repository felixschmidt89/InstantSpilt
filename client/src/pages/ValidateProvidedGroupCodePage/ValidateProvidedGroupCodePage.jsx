import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./ValidateProvidedGroupCodePage.module.css";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";

const ValidateProvideGroupCodePage = () => {
  const { groupCode } = useParams();
  const groupExists = useValidateGroupExistence({ groupCode });
  const navigate = useNavigate();

  useEffect(() => {
    if (groupExists === true) {
      storeGroupCodesInLocalStorageHelper(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      navigate("/instant-split");
    }
  }, [groupExists, groupCode, navigate]);

  return (
    <main className={styles.container}>
      <h1>GroupCode validation</h1>
      {/* Handle different outcomes */}
      {groupExists === null && <Spinner />}
      {groupExists === false && (
        <div>
          <p>
            🚧 Oops, there's no group associated with the provided GroupCode.
          </p>
          <Link to='/homepage'>Go to main</Link>
        </div>
      )}
    </main>
  );
};

export default ValidateProvideGroupCodePage;
