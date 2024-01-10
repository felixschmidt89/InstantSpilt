import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  removeActiveGroupCodeFromLocalStorage,
  removeActiveGroupCodeFromStoredGroupCodes,
  removeViewStateFromLocalStorage,
} from "../../utils/localStorageUtils";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

const IndexNavigatorPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const navigate = useNavigate();
  const [groupExists] = useValidateGroupExistence({
    groupCode,
  });

  useEffect(() => {
    if (groupExists === false) {
      removeActiveGroupCodeFromStoredGroupCodes(groupCode);
      removeActiveGroupCodeFromLocalStorage();
      removeViewStateFromLocalStorage();
      navigate("/homepage/");
    } else if (groupExists === true) {
      navigate("/instant-split");
    }
  }, [navigate, groupExists, groupCode]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit' />
    </main>
  );
};

export default IndexNavigatorPage;
