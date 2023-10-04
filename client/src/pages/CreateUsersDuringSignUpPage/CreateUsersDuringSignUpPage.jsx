import React, { useState } from "react";
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
      <NavigateButton
        route={"instant-split"}
        alignment={"right"}
        buttonText={"next"}
      />
      <CreateUserForm toggleDataRefresh={toggleDataRefresh} />
      <RenderUserNames refreshData={refreshData} />
    </main>
  );
}

export default CreateUsersDuringSignUpPage;
