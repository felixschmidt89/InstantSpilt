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

// Styles
import styles from "./AcceptGroupInvitationAndJoinPage.module.css";
import InstantSplitLogo from "../../components/common/InstantSplitLogo/InstantSplitLogo";

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
      <PiratePx COUNT_IDENTIFIER={"accept-invitation-landing-page"} />
      {isFetched && (
        <>
          <span className={styles.instantSplitLogo}>
            <InstantSplitLogo width={"24"} linkToInstantSplitPage={false} />
          </span>
          <h1 className={styles.homepageHeader}>Hi there!</h1>
          <div className={styles.container}>
            <InvitationIntro groupData={groupData} />
            <InstantSplitIntroSection isInvitation={true} />
          </div>
          <div className={styles.acceptInvitationSection}>
            <AcceptGroupInvitation
              groupCode={groupCode}
              groupName={groupName}
            />
          </div>
        </>
      )}
    </main>
  );
};
export default AcceptGroupInvitationAndJoinPage;
