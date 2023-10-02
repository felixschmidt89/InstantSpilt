import React, { useState } from "react";
import GroupBalances from "../../components/GroupBalances/GroupBalances";
import GroupHistory from "../../components/GroupHistory/GroupHistory";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupData from "../../hooks/useFetchGroupData";
import GroupActionsContainer from "../../components/GroupActionsContainer/GroupActionsContainer";
import useCheckGroupCodePresenceAndNavigateHome from "../../hooks/useCheckGroupCodePresenceAndNavigateHome";
import UserActionsComponent from "../../components/UserActionsComponent/UserActionsComponent";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";

export default function InstantSplitPage() {
  const groupCode = localStorage.getItem("activeGroupCode");

  useCheckGroupCodePresenceAndNavigateHome();

  const [view, setView] = useState("view2");
  const groupData = useFetchGroupData(groupCode);

  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };

  if (groupData === null) {
    return (
      <main>
        <Spinner />
      </main>
    );
  } else {
    return (
      <main>
        <h1>{groupData.group.groupName}</h1>
        <UserActionsComponent
          groupCode={groupCode}
          groupName={groupData.group.groupName}
        />
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
              view === "view2" ? styles.expensesButton : styles.balancesButton
            } ${view === "view2" ? "" : styles.inactiveButton}`}
            onClick={handleSwitchView}
            disabled={view === "view2"}>
            Balances
          </button>
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
        <GroupActionsContainer />
      </main>
    );
  }
}
