// DONE adding only meaningful necessary comments

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import styles from "./AcceptInviteAndJoinPage.module.css";

const AcceptInviteAndJoinPage = () => {
  const { groupCode } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const groupData = useFetchGroupData(groupCode);

  // Set isLoading to false when group data is received.
  useEffect(() => {
    if (groupData !== null && groupData !== undefined) {
      setIsLoading(false);
    }
  }, [groupData]);

  // On confirmation button click: store groupCode in client's localStorage and navigate to instant-split page
  const handleAcceptInvitation = () => {
    storeGroupCodesInLocalStorageHelper(groupCode);
    setGroupCodeToCurrentlyActiveHelper(groupCode);
    navigate("/instant-split");
  };

  // Visually indicate fetching, render button to accept invitation when data is received
  return (
    <main className={styles.container}>
      <h1>Hey there!</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && groupData && (
        <div className={styles.explanationContainer}>
          <p>
            Someone has given you this link so you can access{" "}
            <strong>{groupData.group.groupName}</strong> - a group to settle
            expenses - on this device.
          </p>
          <h2>Are you in?</h2>
          <button className={styles.button} onClick={handleAcceptInvitation}>
            Sure!
          </button>
        </div>
      )}
    </main>
  );
};

export default AcceptInviteAndJoinPage;
