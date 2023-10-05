import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ShareGroupPage.module.css";

import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import CopyToClipBoard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";
import WebShareApiInvite from "../../components/singleComponents/WebShareApiInvite/WebShareApiInvite";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupPage = () => {
  // Check if Web Share API is supported on client's device
  const isWebShareAPISupported = navigator.share !== undefined;

  const { groupName, groupCode } = useParams();

  const urlEncodedGroupName = encodeURIComponent(groupName);
  const infoToCopy = `${baseUrl}/join/${urlEncodedGroupName}/${groupCode}`;

  return (
    <main>
      <NavigateButton
        route='instant-split'
        buttonText='back'
        alignment='left'
      />
      <div className={styles.container}>
        <h1>Invite & share</h1>
        <p>
          To invite others to join <strong>{groupName}</strong> or use
          InstantSplit on your other devices, just copy and share this link:
        </p>
        <CopyToClipBoard infoToCopy={infoToCopy} />
        {isWebShareAPISupported && (
          <div className={styles.WebShare}>
            <WebShareApiInvite groupCode={groupCode} groupName={groupName} />
          </div>
        )}
      </div>
    </main>
  );
};

export default ShareGroupPage;
