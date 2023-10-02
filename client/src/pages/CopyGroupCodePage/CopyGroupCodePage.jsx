import React from "react";
import CopyToClipboard from "../../components/CopyToClipboard/CopyToClipboard";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

const CopyGroupCodePage = () => {
  const pathParts = window.location.pathname.split("/");
  const groupName = pathParts[pathParts.length - 2];
  const groupCode = pathParts[pathParts.length - 1];

  return (
    <main>
      <NavigateButton
        route='instant-split'
        buttonText='back'
        alignment='left'
      />
      <div>
        <h1>Copy & save groupCode</h1>
        <p>
          To regain access to <strong>{groupName}</strong> on any device easily,
          store your groupCode somewhere safe:
        </p>
        <CopyToClipboard infoTocopy={groupCode} />
      </div>
    </main>
  );
};

export default CopyGroupCodePage;
