import React from "react";
import NavigateButton from "../NavigateButton/NavigateButton";
import styles from "./GroupActionsContainer.module.css";

const GroupActionsContainer = () => {
  return (
    <div className={styles.buttonContainer}>
      <NavigateButton
        route={"create-expense"}
        buttonText={"+ expense"}
        margin={"5px"}
      />
      <NavigateButton
        route={"create-payment"}
        buttonText={"+ payment"}
        margin={"5px"}
      />
      <NavigateButton
        route={"create-users-inapp"}
        buttonText={"+ user"}
        margin={"5px"}
      />
      <NavigateButton
        route={"settle-expenses"}
        buttonText={"settle"}
        margin={"5px"}
      />
    </div>
  );
};

export default GroupActionsContainer;
