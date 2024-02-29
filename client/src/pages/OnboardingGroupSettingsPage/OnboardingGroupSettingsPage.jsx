// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import Spinner from "../../components/common/Spinner/Spinner";
import Emoji from "../../components/common/Emoji/Emoji";
import GroupCodeSecurity from "../../components/features/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";

// Styles
import styles from "./OnboardingGroupSettingsPage.module.css";

/**
 * Page component for rendering group currency & data purge settings during group creation process
 */
const OnboardingGroupSettingsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  // Check if current user has created group from within the application, started from manage-groups route
  const isInAppGroupCreator = previousRoute.includes("/manage-groups");
  if (isRetrieved) {
    devLog("Current user is InstantSplit user:", isInAppGroupCreator);
  }

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - group settings' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-group-settings"} />
      <div className={styles.rightAligned}>
        <div className={styles.rightAligned}>
          <InAppNavigationBar forward={true} forwardRoute='/instant-split' />
        </div>
      </div>
      <div className={styles.container}>
        <h1>
          group settings{" "}
          <Emoji label='settings emoji' emoji={emojiConstants.settings} />
        </h1>{" "}
        {isFetched && groupData ? (
          <div className={styles.settings}>
            <ChangeGroupCurrency
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
              isOnboarding={true}
            />
            <ChangeDataPurgeSetting
              groupCode={groupCode}
              inactiveDataPurge={groupData.group.inactiveDataPurge}
            />
            <GroupCodeSecurity groupCode={groupCode} />
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

export default OnboardingGroupSettingsPage;
