import React, { useState } from "react";
import Balances from "../containers/Balances";
import Expenses from "../containers/Expenses";

export default function InstantSplitPage() {
  const [view, setView] = useState("view1");

  const handleSwitchView = (newView) => {
    setView(newView);
  };

  return (
    <div>
      <h2>View Switcher</h2>
      <button onClick={() => handleSwitchView("view1")}>Balances</button>
      <button onClick={() => handleSwitchView("view2")}>Expenses</button>

      {view === "view1" && <Balances />}
      {view === "view2" && <Expenses />}
    </div>
  );
}
