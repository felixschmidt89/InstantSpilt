// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useFetchGroupData from "../../hooks/useFetchGroupData";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ChangeGroupCurrency from "../../components/features/GroupSettings/ChangeGroupCurrency/ChangeGroupCurrency";
import ChangeDataPurgeSetting from "../../components/features/GroupSettings/ChangeDataPurgeSetting/ChangeDataPurgeSetting";
import Spinner from "../../components/common/Spinner/Spinner";
import GroupCodeSecurity from "../../components/features/GroupSettings/GroupCodeSecurity/GroupCodeSecurity";

// Styles
import styles from "./OnboardingGroupSettingsPage.module.css";

/**
 * Page component for rendering group currency & data purge settings during group creation process
 */
const OnboardingGroupSettingsPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupData, isFetched } = useFetchGroupData(groupCode);
  const { t } = useTranslation();

  return (
    <main>
      <HelmetMetaTagsNetlify
        title={t("onboarding-group-settings-page-title")}
      />
      <PiratePx COUNT_IDENTIFIER={"onboarding-group-settings"} />
      <InAppNavigationBar
        back={true}
        backRoute='/onboarding-create-group'
        forward={true}
        forwardRoute='/instant-split'
      />
      <div className={styles.container}>
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
