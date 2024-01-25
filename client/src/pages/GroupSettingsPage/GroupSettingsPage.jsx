// React and Third-Party Libraries
import React from "react";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";

// Styles
import styles from "./GroupSettingsPage.module.css";
import ChangeGroupName from "../../components/features/GroupSettings/ChangeGroupName/ChangeGroupName";
import Emoji from "../../components/common/Emoji/Emoji";
import emojiConstants from "../../constants/emojiConstants";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import Spinner from "../../components/common/Spinner/Spinner";

const GroupSettingsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - group settings' />
      <PiratePx COUNT_IDENTIFIER='group-settings' />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>
          group settings{" "}
          <Emoji label='settings emoji' emoji={emojiConstants.settings} />
        </h1>
        {isFetched && groupData ? (
          <ChangeGroupName
            groupCode={groupCode}
            groupName={groupData.group.groupName}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

export default GroupSettingsPage;
