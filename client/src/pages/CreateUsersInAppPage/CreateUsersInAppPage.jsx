// React and Third-Party Libraries
import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";

// Styles
import styles from "./CreateUsersInAppPage.module.css";
import CreateUser from "../../components/features/CreateUser/CreateUser/CreateUser";

/**
 * Page for creating users within the main application.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
function CreateUsersInAppPage() {
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
        <CreateUser />
      </div>
    </main>
  );
}

export default CreateUsersInAppPage;
