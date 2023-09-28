import React, { useState } from "react";
import GroupBalances from "../components/GroupBalances";
import GroupExpenses from "../components/GroupExpenses";
import styles from "./InstantSplitPage.module.css";
import useFetchGroupName from "../hooks/useFetchGroupName";

export default function InstantSplitPage() {
  const [view, setView] = useState("view1");
  const groupCode = localStorage.getItem("activeGroupCode");

  const groupName = useFetchGroupName(groupCode);

  const handleSwitchView = () => {
    // Toggle the view between "view1" and "view2"
    setView(view === "view1" ? "view2" : "view1");
  };

  return (
    <div>
      <h2>{groupName}</h2> {/* Display the group name */}
      <button className={styles.button} onClick={handleSwitchView}>
        {view === "view1" ? "Show expenses" : "Show balances"}
      </button>
      {view === "view1" && <GroupBalances />}
      {view === "view2" && <GroupExpenses />}
    </div>
  );
}
