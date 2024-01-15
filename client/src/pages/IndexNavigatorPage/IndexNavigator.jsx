import React from "react";
import { useNavigate } from "react-router-dom";

import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import useAuthenticateUsersActiveGroupCode from "../../hooks/useAuthenticateUsersActiveGroupCode";

const IndexNavigatorPage = () => {
  const navigate = useNavigate();

  const groupCode = localStorage.getItem("activeGroupCode");

  useAuthenticateUsersActiveGroupCode(groupCode);

  navigate("instant-split");

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit' />
    </main>
  );
};

export default IndexNavigatorPage;
