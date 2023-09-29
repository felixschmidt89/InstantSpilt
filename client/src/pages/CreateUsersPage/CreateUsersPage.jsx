import React from "react";
import { useState } from "react";
import styles from "./CreateUsersPage.module.css";
import CreateUser from "../../components/CreateUser";
import RenderUserNames from "../../components/RenderUserNames";
import NavigateButton from "../../components/NavigateButton";

function CreateUsersPage() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <CreateUser toggleDataRefresh={toggleDataRefresh} />
      <NavigateButton route={"instant-split"} buttonText={"next"} />
      <RenderUserNames refreshData={refreshData} />
    </main>
  );
}

export default CreateUsersPage;
