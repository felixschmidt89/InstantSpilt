import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import removeActiveGroupCodeFromLocalStorageHelper from "../../helpers/removeActiveGroupCodeFromLocalStorageHelper";
import removeActiveGroupCodeFromStoredGroupCodesHelper from "../../helpers/removeActiveGroupCodeFromStoredGroupCodesHelper";
import removeViewStateFromLocalStorageHelper from "../../helpers/removeViewStateFromLocalStorageHelper";
import useValidateGroupExistence from "../../hooks/useValidateGroupCodeExistence";

const IndexNavigator = () => {
  const navigate = useNavigate();

  const groupCode = localStorage.getItem("activeGroupCode");

  const [groupExists] = useValidateGroupExistence({
    groupCode,
  });

  useEffect(() => {
    if (groupExists === false) {
      removeActiveGroupCodeFromStoredGroupCodesHelper(groupCode);
      removeActiveGroupCodeFromLocalStorageHelper();
      removeViewStateFromLocalStorageHelper();
      navigate("/homepage/");
    } else if (groupExists === true) {
      navigate("/instant-split");
    }
  }, [navigate, groupExists]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit' />
    </main>
  );
};

export default IndexNavigator;
