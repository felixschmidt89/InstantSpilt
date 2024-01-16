// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import { isWebShareAPISupported } from "../../utils/deviceUtils";

// Component
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ShareGroupIncludingWebShare from "../../components/features/ShareGroup/ShareGroupIncludingWebShare/ShareGroupIncludingWebShare";
import ShareGroup from "../../components/features/ShareGroup/ShareGroup/ShareGroup";

// Styles
import styles from "./ShareGroupPage.module.css";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupPage = () => {
  const { groupName, groupCode } = useParams();

  const supportsWebShareAPI = isWebShareAPISupported();

  // Force URL-encoded groupNames
  const urlEncodedGroupName = encodeURIComponent(groupName);

  const infoToCopy = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`InstantSplit - invite & share ${groupName}`}
      />
      <PiratePx COUNT_IDENTIFIER={"share-group"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>Invite & share</h1>
        {supportsWebShareAPI ? (
          <ShareGroupIncludingWebShare
            groupName={groupName}
            groupCode={groupCode}
            infoToCopy={infoToCopy}
          />
        ) : (
          <ShareGroup groupName={groupName} infoToCopy={infoToCopy} />
        )}
      </div>
    </main>
  );
};

export default ShareGroupPage;
