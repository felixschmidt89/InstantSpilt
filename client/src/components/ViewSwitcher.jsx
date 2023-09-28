import { useState } from "react";
import "./styles.css";

enum SwitchOptions {
  OPTION1 = "Option 1",
  OPTION2 = "Option 2"
}

export default function App() {
  );

  const handleSwitchClick = (option: SwitchOptions) => {
    setActiveOption(option);
  };

  return (
    <div className="background">
      <div className="SwitchContainer">
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION1 ? "grey" : "transparent"
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION1)}
        >
          <div className={"Text"}>Option 1</div>
        </div>
        <div
          className="ToggleItem"
          style={{
            backgroundColor:
              activeOption === SwitchOptions.OPTION2 ? "grey" : "transparent"
          }}
          onClick={() => handleSwitchClick(SwitchOptions.OPTION2)}
        >
          <div className={"Text"}>Option 2</div>
        </div>
      </div>
    </div>
  );
}
