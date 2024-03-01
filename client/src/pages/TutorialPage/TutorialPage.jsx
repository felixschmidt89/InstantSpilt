// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import GroupCodeExplanation from "../../components/features/Tutorial/GroupCodeExplanation/GroupCodeExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import SyncGroupCodeExplanation from "../../components/features/Tutorial/SyncGroupCodeExplanation/SyncGroupCodeExplanation";
import GroupBalanceAndHistoryExplanation from "../../components/features/Tutorial/GroupBalanceAndHistoryExplanation/GroupBalanceAndHistoryExplanation";
import ActiveGroupBarExplanation from "../../components/features/Tutorial/ActiveGroupBarExplanation/ActiveGroupBarExplanation";
import RecommendedBrowsersExplanation from "../../components/features/Tutorial/RecommendedBrowsersExplanation/RecommendedBrowsersExplanation";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./TutorialPage.module.css";

function TutorialPage() {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - tutorial' />
      <PiratePx COUNT_IDENTIFIER={"tutorial"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>tutorial</h1>
        {!isFetched ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.section}>
              <RecommendedBrowsersExplanation />
            </div>
            <div className={styles.section}>
              <GroupCodeExplanation
                initialGroupName={groupData.group.initialGroupName}
                groupCode={groupCode}
              />
            </div>
            <div className={styles.section}>
              <GroupBalanceAndHistoryExplanation />
            </div>
            <div className={styles.section}>
              <ActiveGroupBarExplanation />
            </div>
            <SyncGroupCodeExplanation />
          </>
        )}
      </div>
    </main>
  );
}

export default TutorialPage;
