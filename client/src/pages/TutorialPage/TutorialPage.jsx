// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import GroupCodeExplanation from "../../components/features/Tutorial/GroupCodeExplanation/GroupCodeExplanation";
import TopSectionExplanation from "../../components/features/Tutorial/TopSectionExplanation/TopSectionExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/BottomSectionExplanation/BottomSectionExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/common/Spinner/Spinner";

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
        <TopSectionExplanation />
        <MiddleSectionExplanation />
        <BottomSectionExplanation />
        <GroupCodeExplanation
          initialGroupName={initialGroupName}
          groupCode={groupCode}
        />
      </div>
    </main>
  );
}

export default TutorialPage;
