import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./AcceptInviteAndJoinPage.module.css";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import storeGroupCodesInLocalStorageHelper from "../helpers/storeGroupCodesInLocalStorageHelper";
import setGroupCodeToCurrentlyActiveHelper from "../helpers/setGroupCodeToCurrentlyActiveHelper";

const AcceptInviteAndJoinPage = () => {
  const { groupCode } = useParams();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const groupDataResponse = useFetchGroupData(groupCode);

  useEffect(() => {
    if (
      groupDataResponse.status === "success" &&
      confirmed &&
      groupDataResponse.data.group !== null
    ) {
      storeGroupCodesInLocalStorageHelper(groupCode);
      setGroupCodeToCurrentlyActiveHelper(groupCode);
      // navigate("/instant-split");
    }
  }, [groupDataResponse, confirmed, navigate]);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <main className={styles.container}>
      <h1>GroupCode validation</h1>
      {groupDataResponse.status === "loading" && <p>Validating groupCode...</p>}
      {groupDataResponse.status === "error" && (
        <div>
          <p>🚧 Oops, there's an error validating the provided GroupCode.</p>
          <Link to='/homepage'>Go to main</Link>
        </div>
      )}
      {groupDataResponse.status === "success" && !confirmed && (
        <div>
          {groupDataResponse.data.group !== null ? (
            <>
              <p>
                You've been invited to {groupDataResponse.data.group.groupName}
              </p>
              <p>Do you want to join?</p>
              <button onClick={handleConfirm}>Confirm</button>
            </>
          ) : (
            <>
              <p>
                🚧 Oops, there's no group associated with the provided
                GroupCode.
              </p>
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default AcceptInviteAndJoinPage;
