import React, { useState } from "react";
import GroupBalances from "../../components/GroupBalances/GroupBalances";
import GroupHistory from "../../components/GroupHistory/GroupHistory";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupName from "../../hooks/useFetchGroupName";
import useCheckGroupCodeAndNavigateToHome from "../../hooks/useCheckGroupCodePresenceAndNavigateHome.jsx";
import GroupActionsContainer from "../../components/GroupActionsContainer/GroupActionsContainer";

export default function InstantSplitPage() {
  const groupCode = localStorage.getItem("activeGroupCode");

  useCheckGroupCodeAndNavigateToHome({ groupCode });

  const [view, setView] = useState("view2");
  const groupName = useFetchGroupName(groupCode);

  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };

  return (
    <main>
      <h1>{groupName}</h1>
      <div className='styles.buttonContainer'>
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
