import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "../../components/common/CopyToClipboard/CopyToClipboard";
import styles from "./GroupCodeExplanationPage.module.css";

const ExplainGroupCode = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <div className={styles.container}>
      <h1>Crucial info for group creators</h1>
      <p>
        The key to settling group expenses easily while sharing minimal data is
        the <strong>GroupCode</strong>. Here's yours:
      </p>
      <CopyToClipboard infoToCopy={groupCode} />
      <p>Be sure to write it down in a safe place.</p>
      <p>
        Alternatively, bookmark the invitation link (
        <FontAwesomeIcon icon={faUserPlus} />) in the top section of the main
        application to avoid losing access to your group.
      </p>
    </div>
  );
};

export default ExplainGroupCode;
