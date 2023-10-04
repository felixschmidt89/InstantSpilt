// DONE adding only meaningful necessary comments

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import styles from "./AcceptInviteAndJoinPage.module.css";

const AcceptInviteAndJoinPage = () => {
  const { groupCode, groupName } = useParams();
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
      <Helmet>
        {/* Standard metadata tags */}
        <title>InstantSplit invitation to settle group expenses</title>
        <meta
          name='description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
        />
        {/* Facebook tags */}
        <meta property='og:type' content={"website"} />
        <meta
          property='og:title'
          content={"InstantSplit invitation to settle group expenses"}
        />
        <meta
          property='og:description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
        />
        {/* Twitter tags */}
        <meta name='twitter:creator' content={groupName} />
        <meta name='twitter:card' content={"summary_large_image"} />
        <meta
          name='twitter:title'
          content={"InstantSplit invitation to settle group expenses"}
        />
        <meta
          name='twitter:description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
        />
        {/* End Twitter tags */}
      </Helmet>
      <h1>Hey there!</h1>
      {isLoading && <Spinner />}
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
