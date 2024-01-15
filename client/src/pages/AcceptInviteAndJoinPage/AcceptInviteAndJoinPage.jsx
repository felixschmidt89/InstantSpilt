import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import {
  storeGroupCodeInLocalStorage,
  setGroupCodeToCurrentlyActive,
} from "../../utils/localStorageUtils";
import styles from "./AcceptInviteAndJoinPage.module.css";
import LinkToPage from "../../components/common/InAppNavigation/LinkToPage/LinkToPage";

/**
 * Addresses users joining a group via invitation link.
 * Renders invitation info including groupName for recognition
 * Renders a brief explanation of the application.
 * Renders join button which triggers storing GroupCode in the client's local storage and navigate to main application
 */
const AcceptInviteAndJoinPage = () => {
  const { groupCode, groupName } = useParams();
  const navigate = useNavigate();
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  // On confirmation button click: store groupCode in client's localStorage and navigate to onboarding page
  const handleAcceptInvitation = () => {
    storeGroupCodeInLocalStorage(groupCode);
    setGroupCodeToCurrentlyActive(groupCode);
    navigate("/onboarding-tutorial");
  };

  // Updating Visually indicate fetching, render button to accept invitation when data is received
  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`Invitation to join ${groupName}`}
        description={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
      />
      <PiratePx COUNT_IDENTIFIER={"join"} />
      <div className={styles.explanationContainer}>
        <h1>Hey there!</h1>
        {!isFetched && <Spinner />}
        {isFetched && groupData && (
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
            <p className={styles.terms}>
              By using InstantSplit you agree to our{" "}
              <span className={styles.noWrap}>
                <LinkToPage
                  to={"/terms-and-conditions"}
                  setPreviousRoute={true}>
                  terms and conditions
                </LinkToPage>
              </span>
            </p>
          </>
        )}
      </div>
    </main>
  );
};
export default AcceptInviteAndJoinPage;
