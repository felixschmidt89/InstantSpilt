import React from "react";
import styles from "./SettleGroupExpensesPage.module.css";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import SettlementParent from "../../components/containerComponents/SettlementParent/SettlementParent";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

function SettleGroupExpensesPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Settle expenses' />
      <PiratePx COUNT_IDENTIFIER={"settle-expenses"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <div className={styles.container}>
        <h1>Settle group expenses</h1>
        <SettlementParent />
      </div>
    </main>
  );
}

export default SettleGroupExpensesPage;
