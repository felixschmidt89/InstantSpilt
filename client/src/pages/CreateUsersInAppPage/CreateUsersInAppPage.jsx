import React, { useState } from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CreateUser from "../../components/features/CreateUser/CreateUser";
import RenderUserNames from "../../components/features/RenderUserNames/RenderUserNames";
import styles from "./CreateUsersInAppPage.module.css";

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
        <CreateUser toggleDataRefresh={toggleDataRefresh} />
        <RenderUserNames refreshData={refreshData} />
      </div>
    </main>
  );
}

export default CreateUsersInAppPage;
