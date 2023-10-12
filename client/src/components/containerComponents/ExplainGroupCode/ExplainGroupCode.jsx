import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./GroupCodeExplanationPage.module.css";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "./CopyToClipboard";
import styles from "./YourStyles.module.css";

const ExplainGroupCode = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <div className={styles.container}>
      <h1>Crucial info for group creators</h1>
      <p>
        The key to settling group expenses easily while sharing minimal data is
        the <strong>GroupCode</strong>. Here's yours:
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
  );
};

export default ExplainGroupCode;