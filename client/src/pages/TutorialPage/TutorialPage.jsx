// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import ExplainMainFunctionalities from "../../components/features/Tutorial/ExplainMainFunctionalities/ExplainMainFunctionalities";
import ExplainGroupCode from "../../components/features/Tutorial/ExplainGroupCode/ExplainGroupCode";

// Styles
import styles from "./TutorialPage.module.css";

function TutorialPage() {
  // Destructure parameters from URL
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
        <ExplainMainFunctionalities />
        <ExplainGroupCode groupName={groupName} groupCode={groupCode} />
      </div>
    </main>
  );
}

export default TutorialPage;
