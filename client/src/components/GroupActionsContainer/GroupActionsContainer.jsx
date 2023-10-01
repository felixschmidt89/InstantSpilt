import React from "react";
import NavigateButton from "../NavigateButton/NavigateButton";
import styles from "./GroupActionsContainer.module.css";

const GroupActionsContainer = () => {
  return (
    <div className={styles.buttonContainer}>
      <NavigateButton
        route={"create-expense"}
        buttonText={"+ expense"}
        margin={"2px"}
      />
      <NavigateButton
        route={"create-payment"}
        buttonText={"+ payment"}
        margin={"2px"}
      />
      <NavigateButton
        route={"create-users-inapp"}
        buttonText={"+ user"}
        margin={"2px"}
      />
    </div>
  );
};

export default GroupActionsContainer;
