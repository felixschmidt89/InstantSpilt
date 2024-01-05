import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./RenderGroupPayments.module.css";

export default function RenderGroupExpenses({ item }) {
  return (
    <div className={styles.payments}>
      <div className={styles.leftColumn}>
        <div className={styles.paymentEmoji}>{emojiConstants.payment}</div>
        <div className={styles.paymentAmount}>
          <Link
            to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            {item.paymentAmount.toFixed(2)}€
          </Link>
        </div>
      </div>
      <div className={styles.rightColumn}>
        {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
        {item.paymentRecipient.userName}
      </div>
    </div>
  );
}
