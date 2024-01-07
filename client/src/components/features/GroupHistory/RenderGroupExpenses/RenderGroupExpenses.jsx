import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./RenderGroupExpenses.module.css";

const RenderGroupExpenses = ({ item }) => {
  return (
    <div className={styles.expenses}>
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>{emojiConstants.expense}</div>
        <div className={styles.expenseAmount}>
          <Link
            to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            {item.expenseAmount.toFixed(2)}€
          </Link>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          {emojiConstants.paidFor} {item.expensePayer.userName}:{" "}
          <Link
            to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            {item.expenseDescription}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenderGroupExpenses;
