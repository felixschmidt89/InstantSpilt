// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Hooks
import useGetInactiveGroupsFromLocalStorage from "../../../../../hooks/useGetInactiveGroupsFromLocalStorage";

// Components
import RenderGroupSelection from "../RenderGroupSelection/RenderGroupSelection";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./SwitchGroups.module.css";

const SwitchGroups = ({ groupCode }) => {
  const { t } = useTranslation();

  const {
    inactiveGroupNamesAndGroupCodes,
    isFetched,
    error: fetchAndTransformError,
  } = useGetInactiveGroupsFromLocalStorage(groupCode);

  return (
    <div className={styles.container}>
      <h2>{t("switch-groups-header")}</h2>

      {isFetched && (
        <div>
          {inactiveGroupNamesAndGroupCodes.length === 0 ? (
            <p className={styles.noGroupsMessage}>
              {t("switch-groups-no-additional-groups-copy")}{" "}
            </p>
          ) : (
            <RenderGroupSelection
              groupCode={groupCode}
              groupNamesAndGroupCodes={inactiveGroupNamesAndGroupCodes}
            />
          )}
        </div>
      )}
      <ErrorDisplay error={fetchAndTransformError} />
    </div>
  );
};

export default SwitchGroups;
