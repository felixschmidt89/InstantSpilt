import React from "react";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupPage = () => {
  const pathParts = window.location.pathname.split("/");
  const groupName = pathParts[pathParts.length - 2];
  const groupCode = pathParts[pathParts.length - 1];

  console.log(groupName, groupCode);

  const infoTocopy = `${baseUrl}/join/${groupCode}`;

  return (
    <main>
      <NavigateButton
        route='instant-split'
        buttonText='back'
        alignment='left'
      />
      <div>
        <h1>Invite & Share</h1>
        <p>
          To invite others to join <strong>{groupName}</strong> or use
          InstantSplit on your other devices, just copy and share this link:
        </p>
        <CopyToClipboard infoTocopy={infoTocopy} inputFieldWidth='400px' />
      </div>
    </main>
  );
};

export default ShareGroupPage;
