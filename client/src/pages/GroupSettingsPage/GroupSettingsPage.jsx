// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Emoji from "../../components/common/Emoji/Emoji";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Spinner from "../../components/common/Spinner/Spinner";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import ChangeResourceName from "../../components/common/ChangeResourceName/ChangeResourceName";

// Styles
import styles from "./GroupSettingsPage.module.css";
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
          <div className={styles.settingsContainer}>
            {/*Change group name */}
            <ChangeResourceName
              resourceId={groupData.group._id}
              groupCode={groupCode}
              resourceType={"group"}
              headerText={"name"}
              resourceName={groupData.group.groupName}
              navigateToMain={false}
            />
            <ChangeGroupCurrency
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
            <ChangeDataPurgeSetting
              groupCode={groupCode}
              inactiveDataPurge={groupData.group.inactiveDataPurge}
            />
          </div>
        ) : (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
};

export default GroupSettingsPage;
