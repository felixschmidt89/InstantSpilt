import React from "react";
import styles from "./SettleGroupExpensesPage.module.css";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import SuggestSettlePayments from "../../components/containerComponents/SuggestSettlePayments/SuggestSettlePayments";

function SettleGroupExpensesPage() {
  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <div className={styles.container}>
        <h1>Settle group expenses</h1>
        <SuggestSettlePayments />
      </div>
    </main>
  );
}

export default SettleGroupExpensesPage;
