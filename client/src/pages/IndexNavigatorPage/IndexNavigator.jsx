import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

const IndexNavigator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");

    if (groupCode) {
      navigate("/instant-split");
    } else {
      navigate("/homepage");
    }
  }, [navigate]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit' />
    </main>
  );
};

export default IndexNavigator;
