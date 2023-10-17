import React from "react";
import { Link, useParams } from "react-router-dom";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import styles from "./TutorialPage.module.css";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";
import ExplainMainFunctionalities from "../../components/containerComponents/ExplainMainFunctionalities/ExplainMainFunctionalities";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

function TutorialPage() {
  const { groupName, groupCode } = useParams();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Tutorial' />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <PiratePx COUNT_IDENTIFIER={"tutorial/:groupName/:groupCode"} />;
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
