import React from "react";
import { useParams } from "react-router-dom";

import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import CopyToClipBoard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupPage = () => {
  const { groupName, groupCode } = useParams();
  const infoTocopy = `${baseUrl}/join/${groupName}/${groupCode}`;

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
        <CopyToClipBoard infoTocopy={infoTocopy} inputFieldWidth='400px' />
      </div>
    </main>
  );
};

export default ShareGroupPage;
