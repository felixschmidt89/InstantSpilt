import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./RenderGroupPayments.module.css";

export default function RenderGroupExpenses({ item }) {
  return (
    <div className={styles.payments}>
      <span>
        {emojiConstants.payment}{" "}
        <Link to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
          {item.paymentAmount.toFixed(2)}€
        </Link>
      </span>{" "}
      <strong>
        {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
        {item.paymentRecipient.userName}
      </strong>
    </div>
  );
}
