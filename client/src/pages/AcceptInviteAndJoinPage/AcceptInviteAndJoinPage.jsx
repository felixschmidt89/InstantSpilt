// DONE adding only meaningful necessary comments

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import setGroupCodeToCurrentlyActiveHelper from "../../helpers/setGroupCodeToCurrentlyActiveHelper";
import storeGroupCodesInLocalStorageHelper from "../../helpers/storeGroupCodesInLocalStorageHelper";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import styles from "./AcceptInviteAndJoinPage.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

/**
 * Addresses users joining a group via invitation link.
 * Renders invitation info including groupName for recognition
 * Renders a brief explanation of the application.
 * Renders join button which triggers storing GroupCode in the client's local storage and navigate to main application
 */
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

  // On confirmation button click: store groupCode in client's localStorage and navigate to onboarding page
  const handleAcceptInvitation = () => {
    storeGroupCodesInLocalStorageHelper(groupCode);
    setGroupCodeToCurrentlyActiveHelper(groupCode);
    navigate("/onboarding");
  };

  // Updating Visually indicate fetching, render button to accept invitation when data is received
  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`Invitation to join ${groupName}`}
        description={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
      />
      <PiratePx COUNT_IDENTIFIER={"/join/:groupName/:groupCode"} />
      <div className={styles.explanationContainer}>
        <h1>Hey there!</h1>
        {isLoading && <Spinner />}
        {!isLoading && groupData && (
          <>
            <p>
              <div>
                Someone invited you to join the InstantSplit{" "}
                <span className={styles.noWrap}>
                  group <strong>{groupData.group.groupName}</strong>.
                </span>
              </div>
            </p>
            <p>
              InstantSplit is the hassle-free way to settle group expenses with
              no user registration or app download while sharing minimal data.
              <div className={styles.strong}>
                {" "}
                <span className={styles.noWrap}>No cookies.</span>{" "}
                <span className={styles.noWrap}>No visitors tracking.</span>{" "}
                <span className={styles.noWrap}>No monetization.</span>{" "}
                <span className={styles.noWrap}>Ever.</span>
              </div>
            </p>
            <p>
              To join <strong>{groupName}</strong>, and settle expenses
              immediately, simply accept this invitation.
            </p>
            <h2>Are you in?</h2>
            <button className={styles.button} onClick={handleAcceptInvitation}>
              Sure!
            </button>
          </>
        )}
      </div>
    </main>
  );
};
export default AcceptInviteAndJoinPage;
