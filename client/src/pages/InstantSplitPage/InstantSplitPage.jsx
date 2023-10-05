// DONE adding only meaningful necessary comments

import React, { useState } from "react";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import useCheckGroupCodePresenceAndNavigateHome from "../../hooks/useCheckGroupCodePresenceAndNavigateHome";
import UserActionsComponent from "../../components/containerComponents/UserActionsComponent/UserActionsComponent";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import GroupBalances from "../../components/containerComponents/GroupBalances/GroupBalances";
import GroupHistory from "../../components/containerComponents/GroupHistory/GroupHistory";
import GroupActionsComponent from "../../components/containerComponents/GroupActionsComponent/GroupActionsComponent";

/**
 * Main component of the application, renders or links to all core features related to settling expenses.
 * First checks if groupCode is available (TODO: groupCode validation) and navigates home if not.
 */
export default function InstantSplitPage() {
  const groupCode = localStorage.getItem("activeGroupCode");

  useCheckGroupCodePresenceAndNavigateHome();

  // Initialize the view state, fetch group data
  const [view, setView] = useState("view2");
  const groupData = useFetchGroupData(groupCode);

  // Handle user view switches
  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };
  // Render spinner until data is fetched
  if (groupData === null) {
    return (
      <main>
        <Spinner />
      </main>
    );
  } else {
    return (
      <main>
        {/* Display group name */}
        <h1>{groupData.group.groupName}</h1>
        {/* Display UserActionsComponent */}
        <UserActionsComponent
          groupCode={groupCode}
          groupName={groupData.group.groupName}
        />
        <div className={styles.buttonContainer}>
          {/* Button to render group Balances view (default) */}
          <button
            className={`${styles.button} ${
              view === "view2" ? styles.expensesButton : styles.balancesButton
            } ${view === "view2" ? "" : styles.inactiveButton}`}
            onClick={handleSwitchView}
            disabled={view === "view2"}>
            Balances
          </button>
          {/* Button to render group History view */}
          <button
            className={`${styles.button} ${
              view === "view1" ? styles.expensesButton : styles.balancesButton
            } ${view === "view1" ? "" : styles.inactiveButton}`}
            onClick={handleSwitchView}
            disabled={view === "view1"}>
            History
          </button>
        </div>
        {view === "view1" ? <GroupHistory /> : <GroupBalances />}
        {/* Display GroupActionsComponent */}

        <GroupActionsComponent />
      </main>
    );
  }
}
