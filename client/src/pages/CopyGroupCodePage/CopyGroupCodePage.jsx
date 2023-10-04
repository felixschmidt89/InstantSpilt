import React from "react";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";

const CopyGroupCodePage = () => {
  const { groupName, groupCode } = useParams();
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
