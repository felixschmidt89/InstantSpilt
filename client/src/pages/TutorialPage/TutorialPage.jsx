// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import GroupCodeExplanation from "../../components/features/Tutorial/GroupCodeExplanation/GroupCodeExplanation";
import TopSectionExplanation from "../../components/features/Tutorial/TopSectionExplanation/TopSectionExplanation";
import MiddleSectionExplanation from "../../components/features/Tutorial/MiddleSectionExplanation/MiddleSectionExplanation";
import BottomSectionExplanation from "../../components/features/Tutorial/BottomSectionExplanation/BottomSectionExplanation";

// Styles
import styles from "./TutorialPage.module.css";

function TutorialPage() {
  const { groupName, groupCode } = useParams();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - tutorial' />
      <PiratePx COUNT_IDENTIFIER={"tutorial"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
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
