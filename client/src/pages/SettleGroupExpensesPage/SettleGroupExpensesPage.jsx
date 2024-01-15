import React from "react";
import styles from "./SettleGroupExpensesPage.module.css";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import SettleExpenses from "../../components/features/SettleExpenses/SettleExpenses/SettleExpenses";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

function SettleGroupExpensesPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - settle expenses' />
      <PiratePx COUNT_IDENTIFIER={"settle-expenses"} />
      <InAppNavigationBar back={true} backRoute='/instant-split' />
      <div className={styles.container}>
        <h1>Settle group expenses</h1>
        <SettleExpenses />
      </div>
    </main>
  );
}

export default SettleGroupExpensesPage;
