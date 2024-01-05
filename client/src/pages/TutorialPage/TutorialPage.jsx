import React from "react";
import { Link, useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import styles from "./TutorialPage.module.css";
import ExplainMainFunctionalities from "../../components/features/ExplainMainFunctionalities/ExplainMainFunctionalities";

function TutorialPage() {
  const { groupName, groupCode } = useParams();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Tutorial' />
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
        <h2>GroupCode</h2>
        <p>
          All you need to access this group is your <strong>Groupcode</strong>.
          So be sure to write it down in a safe place.
        </p>
        <CopyToClipboard infoToCopy={groupCode} />
        <p>
          Alternatively, bookmark the{" "}
          <Link to={`/share-group/${groupName}/${groupCode}`}>
            invitation link
          </Link>{" "}
          to avoid losing access to this group.
        </p>
      </div>
    </main>
  );
}

export default TutorialPage;
