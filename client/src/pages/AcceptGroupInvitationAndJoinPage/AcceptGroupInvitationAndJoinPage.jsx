// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InvitationIntro from "../../components/features/AcceptGroupInvitationAndJoinGroup/InvitationIntro/InvitationIntro";
import InstantSplitIntroSection from "../../components/features/Home/InstantSplitIntroSection/InstantSplitIntroSection";
import AcceptGroupInvitation from "../../components/features/AcceptGroupInvitationAndJoinGroup/AcceptGroupInvitation/AcceptGroupInvitation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./AcceptGroupInvitationAndJoinPage.module.css";

const AcceptGroupInvitationAndJoinPage = () => {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const groupName = groupData?.group?.groupName || "";

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={`Invitation to join ${groupName}`}
        description={`Join our group ${groupName} to manage and settle expenses.`}
      />
      <InAppNavigationBar logoOnly={true} />
      <PiratePx COUNT_IDENTIFIER={"accept-invitation-landing-page"} />
      {isFetched && (
        <div className={styles.container}>
          <h1 className={styles.homepageHeader}>Hi there!</h1>
          <InvitationIntro groupData={groupData} />
          <InstantSplitIntroSection isInvitation={true} />
          <div className={styles.acceptInvitationSection}>
            <AcceptGroupInvitation
              groupCode={groupCode}
              groupName={groupName}
            />
          </div>
        </div>
      )}
    </main>
  );
};
export default AcceptGroupInvitationAndJoinPage;
