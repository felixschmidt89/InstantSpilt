import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./GroupCodeExplanationPage.module.css";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";

const GroupCodeExplanationPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");

  return (
    <main>
      <NavigateButton
        route={"onboarding"}
        alignment={"right"}
        buttonText={"next"}
      />
      <div className={styles.container}>
        <h1>ℹ️ Crucial info for group creators ℹ️</h1>
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
