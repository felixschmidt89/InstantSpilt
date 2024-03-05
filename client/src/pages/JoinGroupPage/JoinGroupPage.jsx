// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
import styles from "./JoinGroupPage.module.css";

const JoinGroupPage = () => {
  const { t } = useTranslation();
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const groupName = groupData?.group?.groupName || "";

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("join-group-page-title", { groupName })}
        description={t("join-group-page-description", { groupName })}
      />
      <InAppNavigationBar logoOnly={true} />
      <PiratePx COUNT_IDENTIFIER={"join-group-page"} />
      {isFetched && (
        <div className={styles.container}>
          <h1 className={styles.homepageHeader}>
            {t("join-group-page-header")}{" "}
          </h1>
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
export default JoinGroupPage;
