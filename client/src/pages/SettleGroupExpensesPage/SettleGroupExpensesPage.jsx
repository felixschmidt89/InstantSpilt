import React from "react";
import styles from "./SettleGroupExpensesPage.module.css";
import SuggestSettlePayments from "../../components/biggerComponents/SuggestSettlePayments/SuggestSettlePayments";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

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
