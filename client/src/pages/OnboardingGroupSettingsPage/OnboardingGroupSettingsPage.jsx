// React and Third-Party Libraries
import React, { useEffect } from "react";

// Constants and Utils
import { devLog } from "../../utils/errorUtils";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useGetPreviousRoutesFromLocalStorage from "../../hooks/useGetPreviousRouteFromLocalStorage";
import useInactiveDataPurgeToggleLogic from "../../hooks/useInactiveDataPurgeToggleLogic";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import OnboardingGroupCodeExplanation from "../../components/features/Onboarding/OnboardingGroupCodeExplanation/OnboardingGroupCodeExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./OnboardingGroupSettingsPage.module.css";

/**
 * Page component for rendering group currency & data purge settings during group creation process
 */
const OnboardingGroupSettingsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const { previousRoute, isRetrieved } = useGetPreviousRoutesFromLocalStorage();

  const { inactiveDataPurge, handleToggleInactiveDataPurge } =
    useInactiveDataPurgeToggleLogic(isFetched, groupData);

  useEffect(() => {
    devLog("Inactive Data Purge:", inactiveDataPurge);
  }, [inactiveDataPurge]);

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
        {
          // Case 1: Redirect recurring InstantSplit users directly to main application
          isInAppGroupCreator ? (
            <div className={styles.rightAligned}>
              <InAppNavigationBar
                forward={true}
                forwardRoute='/instant-split'
              />
            </div>
          ) : (
            // Case 2: Redirect new InstantSplit users to onboarding page
            <InAppNavigationBar
              forward={true}
              forwardRoute='/onboarding-tutorial'
            />
          )
        }
      </div>

      <div className={styles.container}>
        <h1>group settings</h1>
        {isFetched && groupData ? (
          <>
            <ChangeGroupCurrency
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
              isOnboarding={true}
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
        <OnboardingGroupCodeExplanation groupCode={groupCode} />
      </div>
    </main>
  );
};

export default OnboardingGroupSettingsPage;
