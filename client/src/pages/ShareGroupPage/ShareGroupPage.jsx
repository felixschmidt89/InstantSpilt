import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ShareGroupPage.module.css";
import CopyToClipBoard from "../../components/common/CopyToClipboard/CopyToClipboard";
import WebShareApiInvite from "../../components/common/WebShareApiInvite/WebShareApiInvite";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupPage = () => {
  // Check if Web Share API is supported on client's device
  const isWebShareAPISupported = navigator.share !== undefined;

  const { groupName, groupCode } = useParams();

  // Force passing URL-encoded groupNames
  const urlEncodedGroupName = encodeURIComponent(groupName);
  const infoToCopy = `${baseUrl}/join/${urlEncodedGroupName}/${groupCode}`;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`InstantSplit - Invite & share ${groupName}`}
      />
      <PiratePx COUNT_IDENTIFIER={"share-group"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />{" "}
      <div className={styles.container}>
        <h1>Invite & share</h1>
        {isWebShareAPISupported ? (
          <div className={styles.WebShare}>
            <p>
              To invite others to join <strong>{groupName}</strong> or to access
              InstantSplit on your other devices, you can use WebShare:
            </p>
            <WebShareApiInvite groupCode={groupCode} groupName={groupName} />
            <p>
              Or, simply copy and share this link:
              <CopyToClipBoard infoToCopy={infoToCopy} />
            </p>
          </div>
        ) : (
          <p>
            To invite others to join <strong>{groupName}</strong> or to access
            InstantSplit on your other devices, simply copy and share this link:
            <CopyToClipBoard infoToCopy={infoToCopy} />
          </p>
        )}
      </div>
    </main>
  );
};

export default ShareGroupPage;
