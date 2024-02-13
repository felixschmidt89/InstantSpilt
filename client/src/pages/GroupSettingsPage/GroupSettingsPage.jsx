// React and Third-Party Libraries
import React, { useEffect } from "react";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";
import { devLog } from "../../utils/errorUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useInactiveDataPurgeToggleLogic from "../../hooks/useInactiveDataPurgeToggleLogic";

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
  const { inactiveDataPurge, handleToggleInactiveDataPurge } =
    useInactiveDataPurgeToggleLogic(isFetched, groupData);

  useEffect(() => {
    devLog("Inactive Data Purge:", inactiveDataPurge);
  }, [inactiveDataPurge]);

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
          <>
            <h2 className={styles.header}>name</h2>
            {/*Change group name */}
            <ChangeResourceName
              resourceId={groupData.group._id}
              groupCode={groupCode}
              resourceType={"group"}
              resourceName={groupData.group.groupName}
              navigateToMain={false}
            />
            <ChangeGroupCurrency
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
            <ChangeDataPurgeSetting
              groupCode={groupCode}
              inactiveDataPurge={inactiveDataPurge}
              onToggleInactiveDataPurge={handleToggleInactiveDataPurge}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

export default GroupSettingsPage;
