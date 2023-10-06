import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateUserForm from "../../components/containerComponents/CreateUserForm/CreateUserForm";
import RenderUserNames from "../../components/containerComponents/RenderUserNames/RenderUserNames";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";

function CreateUsersDuringSignUpPage() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <Helmet>
        <title>InstantSplit - Add user</title>
      </Helmet>
      <NavigateButton
        route={"groupcode-explanation"}
        alignment={"right"}
        buttonText={"next"}
      />
      <CreateUserForm toggleDataRefresh={toggleDataRefresh} />
      <RenderUserNames refreshData={refreshData} />
    </main>
  );
}

export default CreateUsersDuringSignUpPage;
