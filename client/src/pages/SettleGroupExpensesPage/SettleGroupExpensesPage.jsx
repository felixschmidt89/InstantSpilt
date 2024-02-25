// React and Third-Party Libraries
import React from "react";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import SettleExpenses from "../../components/features/SettleExpenses/SettleExpenses/SettleExpenses";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./SettleGroupExpensesPage.module.css";

function SettleGroupExpensesPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - settle expenses' />
      <PiratePx COUNT_IDENTIFIER={"settle-expenses"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>settlement payments</h1>
        <SettleExpenses />
      </div>
    </main>
  );
}

export default SettleGroupExpensesPage;
