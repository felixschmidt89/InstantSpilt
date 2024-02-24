// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import { isWebShareAPISupported } from "../../utils/deviceUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Component
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ShareGroupInvitationIncludingWebShare from "../../components/features/ShareGroupInvitation/ShareGroupInvitationIncludingWebShare/ShareGroupInvitationIncludingWebShare";
import ShareGroupInvitation from "../../components/features/ShareGroupInvitation/ShareGroupInvitation/ShareGroupInvitation";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./ShareGroupInvitationPage.module.css";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupInvitationPage = () => {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const supportsWebShareAPI = isWebShareAPISupported();

  // Making sure that page is not rendered prior to successful data fetching while also not breaking the design
  if (!isFetched) {
    return <main></main>;
  }

  const initialGroupName = groupData.group.initialGroupName;
  const groupName = groupData.group.groupName;
  // Force URL-encoded initial groupName
  const urlEncodedGroupName = encodeURIComponent(initialGroupName);
  const infoToCopy = `${baseUrl}/join-instantsplit-group/${urlEncodedGroupName}/${groupCode}`;

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`InstantSplit - invite & share ${groupName}`}
      />
      <PiratePx COUNT_IDENTIFIER={"share-group"} />
      <InAppNavigationBar back={true} />
      {isFetched && (
        <div className={styles.container}>
          <h1>share access to group</h1>
          {supportsWebShareAPI ? (
            <ShareGroupInvitationIncludingWebShare
              groupName={groupName}
              groupCode={groupCode}
              infoToCopy={infoToCopy}
              initialGroupName={urlEncodedGroupName}
            />
          ) : (
            <ShareGroupInvitation
              groupName={groupName}
              infoToCopy={infoToCopy}
            />
          )}
        </div>
      )}
    </main>
  );
};

export default ShareGroupInvitationPage;
