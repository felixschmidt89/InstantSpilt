import React from "react";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import styles from "./ShareGroupPage.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ShareGroupPage = () => {
  const pathParts = window.location.pathname.split("/");
  const groupName = pathParts[pathParts.length - 2];
  const groupCode = pathParts[pathParts.length - 1];

  console.log(groupName, groupCode);

  const url = `${apiUrl}/groups/join/${groupCode}`;

  return (
    <main>
      <NavigateButton
        route='/instant-split'
        buttonText='back'
        alignment='left'
      />
      <div className={styles.container}>
        <h1>Share an invite</h1> {/* Close the <h1> tag properly */}
        <p>
          The key to settling group expenses easily while sharing minimal data
          is the 6-digit <strong>GroupCode</strong>. <br />
        </p>
        <CopyToClipboard url={url} />
      </div>
    </main>
  );
};

export default ShareGroupPage;
