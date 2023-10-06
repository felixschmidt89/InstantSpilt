import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./RenderGroupExpenses.module.css";

export default function RenderGroupExpenses({ item }) {
  return (
    <div className={styles.expenses}>
      {emojiConstants.expense}
      <Link to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
        {item.expenseAmount.toFixed(2)}€
      </Link>{" "}
      {emojiConstants.paidFor} <strong>{item.expensePayer.userName}</strong>:{" "}
      <div className={styles.item}>{item.expenseName}</div>
    </div>
  );
}
