import React, { useState } from "react";
import GroupBalances from "../../components/GroupBalances";
import GroupExpenses from "../../components/GroupExpenses";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupName from "../../hooks/useFetchGroupName";
import useCheckGroupCodeAndNavigateToHome from "../../hooks/useCheckGroupCodePresenseAndNavigateHome.jsx.jsx";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

export default function InstantSplitPage() {
  const groupCode = localStorage.getItem("activeGroupCode");

  useCheckGroupCodeAndNavigateToHome({ groupCode });

  const [view, setView] = useState("view1");
  const groupName = useFetchGroupName(groupCode);

  const handleSwitchView = () => {
    setView(view === "view1" ? "view2" : "view1");
  };

  return (
    <main>
      <h2>{groupName}</h2> {/* Display the group name */}
      <button className={styles.button} onClick={handleSwitchView}>
        {view === "view1" ? "Show expenses" : "Show balances"}
      </button>
      {view === "view1" && <GroupBalances />}
      {view === "view2" && <GroupExpenses />}
      <NavigateButton route={"create-expense"} buttonText={"add expense"} />
      <NavigateButton route={"create-payment"} buttonText={"add payment"} />
    </main>
  );
}
