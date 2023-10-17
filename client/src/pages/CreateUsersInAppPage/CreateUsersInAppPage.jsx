import React, { useState } from "react";
import CreateUserForm from "../../components/containerComponents/CreateUserForm/CreateUserForm";
import RenderUserNames from "../../components/containerComponents/RenderUserNames/RenderUserNames";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import styles from "./CreateUsersInAppPage.module.css";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

function CreateUsersInAppPage() {
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users-inapp"} />
      <div className={styles.container}>
        <NavigateButton
          route={"instant-split"}
          buttonText={faLeftLong}
          alignment={"left"}
          isIcon={true}
        />
        <CreateUserForm toggleDataRefresh={toggleDataRefresh} />
        <RenderUserNames refreshData={refreshData} />
      </div>
    </main>
  );
}

export default CreateUsersInAppPage;
