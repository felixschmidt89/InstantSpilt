import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import CreateUserForm from "../../components/containerComponents/CreateUserForm/CreateUserForm";
import RenderUserNames from "../../components/containerComponents/RenderUserNames/RenderUserNames";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import styles from "./CreateUsersInAppPage.module.css";

function CreateUsersInAppPage() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <Helmet>
        <title>InstantSplit - Add user</title>
        <meta name='fragment' content='!' />
      </Helmet>
      <div className={styles.container}>
        <NavigateButton
          route={"instant-split"}
          alignment={"left"}
          buttonText={"back"}
        />
        <CreateUserForm toggleDataRefresh={toggleDataRefresh} />
        <RenderUserNames refreshData={refreshData} />
      </div>
    </main>
  );
}

export default CreateUsersInAppPage;
