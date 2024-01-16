// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import GroupCodeExplanation from "../../components/features/Tutorial/GroupCodeExplanation/GroupCodeExplanation";
import TopSectionExplanation from "../../components/features/Tutorial/TopSectionExplanation/TopSectionExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/BottomSectionExplanation/BottomSectionExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./TutorialPage.module.css";

function TutorialPage() {
  const { groupName, groupCode } = useParams();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - tutorial' />
      <PiratePx COUNT_IDENTIFIER={"tutorial"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>Tutorial</h1>
        <TopSectionExplanation />
        <MiddleSectionExplanation />
        <BottomSectionExplanation />
        <GroupCodeExplanation groupName={groupName} groupCode={groupCode} />
      </div>
    </main>
  );
}

export default TutorialPage;
