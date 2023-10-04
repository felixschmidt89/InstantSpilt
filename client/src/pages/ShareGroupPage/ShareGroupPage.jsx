import React from "react";
import { useParams } from "react-router-dom";

import NavigateButton from "../../components/NavigateButton/NavigateButton";
import CopyToClipBoard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";
import MetaTags from "../../components/reuseableComponents/MetaTags/MetaTags";
import { Helmet } from "react-helmet-async";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const ShareGroupPage = () => {
  const { groupName, groupCode } = useParams();
  const infoTocopy = `${baseUrl}/join/${groupCode}`;

  return (
    <main>
      <Helmet>
        {/* Standard metadata tags */}
        <title>InstantSplit invitation to settle group expenses</title>
        <meta
          name='description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
        />
        {/* Facebook tags */}
        <meta property='og:type' content={"website"} />
        <meta
          property='og:title'
          content={"InstantSplit invitation to settle group expenses"}
        />
        <meta
          property='og:description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
        />
        {/* Twitter tags */}
        <meta name='twitter:creator' content={groupName} />
        <meta name='twitter:card' content={"summary_large_image"} />
        <meta
          name='twitter:title'
          content={"InstantSplit invitation to settle group expenses"}
        />
        <meta
          name='twitter:description'
          content={`Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`}
        />
        {/* End Twitter tags */}
      </Helmet>
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
