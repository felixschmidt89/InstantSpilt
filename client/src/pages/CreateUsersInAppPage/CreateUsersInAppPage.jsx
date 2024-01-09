// React and Third-Party Libraries
import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Hooks
import useDataRefresh from "../../hooks/useDataRefresh";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import CreateUser from "../../components/features/CreateUser/CreateUser";
import RenderUserNames from "../../components/features/RenderUserNames/RenderUserNames";

// Styles
import styles from "./CreateUsersInAppPage.module.css";

/**
 * Page for creating users within the main application.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
function CreateUsersInAppPage() {
  // Use custom hook to get groupCode and manage data refresh logic update logic
  const { groupCode, refreshData, toggleDataRefresh } = useDataRefresh();

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add user' />
      <PiratePx COUNT_IDENTIFIER={"create-users-inapp"} />
      <div className={styles.container}>
        <NavigateButton
          route={"instant-split"}
          buttonText={faLeftLong}
          alignment={"left"}
          isIcon={true}
        />
        <CreateUser
          toggleDataRefresh={toggleDataRefresh}
          groupCode={groupCode}
        />
        <RenderUserNames refreshData={refreshData} groupCode={groupCode} />
      </div>
    </main>
  );
}

export default CreateUsersInAppPage;
