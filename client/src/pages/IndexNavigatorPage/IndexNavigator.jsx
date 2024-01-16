// React and Third-Party Libraries
import React from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useAuthenticateUsersActiveGroupCode from "../../hooks/useAuthenticateUsersActiveGroupCode";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";

/**
 * Page component for navigating users with valid activeGroupCode to main application and else to homepage to create or join a group there.
 *
 * @component
 * @returns {JSX.Element} - The rendered IndexNavigatorPage component.
 */
const IndexNavigatorPage = () => {
  const navigate = useNavigate();
  const groupCode = localStorage.getItem("activeGroupCode");
  useAuthenticateUsersActiveGroupCode(groupCode);
  navigate("/instant-split");

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit' />
      <PiratePx COUNT_IDENTIFIER='index-navigator' />
    </main>
  );
};

export default IndexNavigatorPage;
