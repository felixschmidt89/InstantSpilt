import React, { useState } from "react";
import GroupBalances from "../../components/GroupBalances/GroupBalances";
import GroupHistory from "../../components/GroupHistory/GroupHistory";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupName from "../../hooks/useFetchGroupName";
import useCheckGroupCodeAndNavigateToHome from "../../hooks/useCheckGroupCodePresenseAndNavigateHome.jsx";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

export default function InstantSplitPage() {
  const groupCode = localStorage.getItem("activeGroupCode");

  useCheckGroupCodeAndNavigateToHome({ groupCode });

  const [view, setView] = useState("view2"); // Set "view2" as the default view
  const groupName = useFetchGroupName(groupCode);

  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };

  return (
    <main>
      <h1>{groupName}</h1>
      <div>
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
      <NavigateButton
        route={"create-expense"}
        buttonText={"add expense"}
        alignment={"left"}
      />
      <NavigateButton
        route={"create-payment"}
        buttonText={"add payment"}
        alignment={"left"}
      />
      <NavigateButton
        route={"create-users-inapp"}
        buttonText={"add user"}
        alignment={"left"}
      />
    </main>
  );
}
