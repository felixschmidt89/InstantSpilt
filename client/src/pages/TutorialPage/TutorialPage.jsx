// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import GroupCodeExplanation from "../../components/features/Tutorial/GroupCodeExplanation/GroupCodeExplanation";
import TopSectionExplanation from "../../components/features/Tutorial/UserSettingsExplanation/UserSettingsExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/ActiveGroupBarExplanation/ActiveGroupBarExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/common/Spinner/Spinner";
import SyncGroupCodeExplanation from "../../components/features/Tutorial/SyncGroupCodeExplanation/SyncGroupCodeExplanation";

// Styles
import styles from "./TutorialPage.module.css";

function TutorialPage() {
  const { groupCode } = useParams();
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  // Making sure that page is not rendered prior to successful data fetching while also not breaking the design
  if (!isFetched) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }

  const initialGroupName = groupData.group.initialGroupName;

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - tutorial' />
      <PiratePx COUNT_IDENTIFIER={"tutorial"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>tutorial</h1>
        <div className={styles.section}>
          <GroupCodeExplanation
            initialGroupName={initialGroupName}
            groupCode={groupCode}
          />
        </div>
        <div className={styles.section}>
          <TopSectionExplanation />
        </div>
        <div className={styles.section}>
          <MiddleSectionExplanation />
        </div>
        <div className={styles.section}>
          <BottomSectionExplanation />
        </div>
        <SyncGroupCodeExplanation />
      </div>
    </main>
  );
}

export default TutorialPage;
