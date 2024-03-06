// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import JoinGroupViaInvitation from "../../components/features/AcceptGroupInvitationAndJoinGroup/JoinGroupViaInvitation/JoinGroupViaInvitation";

/**
 * Page for joining a group using German meta tags.
 * @returns {JSX.Element} React component.
 */
const JoinGroupENPage = () => {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const groupName = groupData?.group?.groupName || "";
  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`InstantSplit - invitation to ${groupName}`}
        description={`Join ${groupName} to settle our shared expenses.`}
      />
      <PiratePx COUNT_IDENTIFIER={"join-group-english-page"} />
      <InAppNavigationBar logoOnly={true} />
      {isFetched && (
        <JoinGroupViaInvitation groupCode={groupCode} groupName={groupName} />
      )}
    </main>
  );
};
export default JoinGroupENPage;
