import React, { useState } from "react";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import RenderUserNames from "../../components/features/RenderUserNames/RenderUserNames";
import CreateUser from "../../components/features/CreateUser/CreateUser";

const CreateUsersDuringSignUpPage = () => {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users-signup"} />
      <NavigateButton
        route={"groupcode-explanation"}
        buttonText={faRightLong}
        alignment={"right"}
        isIcon={true}
      />
      <CreateUser toggleDataRefresh={toggleDataRefresh} />
      <RenderUserNames refreshData={refreshData} />
    </main>
  );
};

export default CreateUsersDuringSignUpPage;
