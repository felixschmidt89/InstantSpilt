// React and Third-Party Libraries
import React from "react";

// Hooks
import useGetInactiveGroupsFromLocalStorage from "../../../../../hooks/useGetInactiveGroupsFromLocalStorage";

// Components
import RenderGroupSelection from "../RenderGroupSelection/RenderGroupSelection";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import Spinner from "../../../../common/Spinner/Spinner";

// Styles
import styles from "./SwitchGroups.module.css";

const SwitchGroups = ({ groupCode }) => {
  const {
    inactiveGroupNamesAndGroupCodes,
    isFetched,
    error: fetchAndTransformError,
  } = useGetInactiveGroupsFromLocalStorage(groupCode);

  return (
    <div className={styles.container}>
      <h2>switch group</h2>
      {!isFetched ? (
        <Spinner />
      ) : (
        <div>
          {inactiveGroupNamesAndGroupCodes.length === 0 ? (
            <p>No other groups found on this device.</p>
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
