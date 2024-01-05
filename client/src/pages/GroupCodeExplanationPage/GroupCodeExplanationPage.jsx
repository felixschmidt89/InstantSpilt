import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import styles from "./GroupCodeExplanationPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";

const GroupCodeExplanationPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - groupCode explanation' />
      <PiratePx COUNT_IDENTIFIER={"groupcode-explanation"} />
      <NavigateButton
        route={"onboarding"}
        buttonText={faRightLong}
        alignment={"right"}
        isIcon={true}
      />
      <div className={styles.container}>
        <h1>Crucial info for group creators</h1>
        <p>
          The key to settling group expenses easily while sharing minimal data
          is the <strong>GroupCode</strong>. Here's yours:
        </p>
        <p></p>
        <CopyToClipboard infoToCopy={groupCode} />
        <p>Be sure to write it down in a safe place.</p>
        <p>
          Alternatively, bookmark the invitation link (
          <FontAwesomeIcon icon={faUserPlus} />) in the top section of the main
          application to avoid losing access to your group.
        </p>
      </div>
    </main>
  );
};

export default GroupCodeExplanationPage;
