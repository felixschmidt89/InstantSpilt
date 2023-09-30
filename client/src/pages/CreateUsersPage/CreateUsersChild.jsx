import React from "react";
import { useState } from "react";
import CreateUser from "../../components/CreateUser/CreateUser";
import RenderUserNames from "../../components/RenderUserNames/RenderUserNames";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

function CreateUsersChild({ route, alignment, buttonText }) {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <NavigateButton
        route={route}
        alignment={alignment}
        buttonText={buttonText}
      />
      <CreateUser toggleDataRefresh={toggleDataRefresh} />
      <RenderUserNames refreshData={refreshData} />
    </main>
  );
}

export default CreateUsersChild;
