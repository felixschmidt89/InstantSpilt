// React and Third-Party Libraries
import React from "react";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import OnboardingGroupCodeExplanation from "../../components/features/Onboarding/OnboardingGroupCodeExplanation/OnboardingGroupCodeExplanation";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import Spinner from "../../components/common/Spinner/Spinner";

// Styles
import styles from "./OnboardingGroupCodeExplanationPage.module.css";

/**
 * Page component for rendering group currency & data purge settings as well as groupCode information for new users group creators (ie group not created within the main application)
 */
const OnboardingGroupCodeExplanationPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - groupCode explanation' />
      <PiratePx COUNT_IDENTIFIER={"onboarding-groupcode-explanation"} />
      <InAppNavigationBar forward={true} forwardRoute='/onboarding-tutorial' />
      <div className={styles.container}>
        <h1>group settings</h1>
        {isFetched && groupData ? (
          <>
            <ChangeGroupCurrency
              groupCode={groupCode}
              groupCurrency={groupData.group.currency}
            />
            <ChangeDataPurgeSetting
              groupCode={groupCode}
              inactiveDataPurge={groupData.group.inactiveDataPurge}
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

export default OnboardingGroupCodeExplanationPage;
