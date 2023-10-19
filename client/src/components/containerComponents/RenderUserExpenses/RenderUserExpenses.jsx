import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import emojiConstants from "../../../constants/emojiConstants";
import DeleteResourceText from "../../reuseableComponents/DeleteResourceText/DeleteResourceText";
import styles from "./RenderUserExpenses.module.css";

export default function RenderUserExpenses({ item, handleRerender }) {
  const { userId } = useParams();

  return (
    <div className={styles.expenses}>
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>{emojiConstants.expense}</div>
        <div className={styles.expenseAmount}>
          <p>{item.expenseAmount.toFixed(2)}€</p>
          <Link
            to={`/user-history-item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            update
          </Link>
          <DeleteResourceText
            resourceId={item.itemId}
            resourceType={`${item.itemType}s`}
            handleRerender={handleRerender}
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          <ul>
            <li>
              <strong>paid by</strong>: {item.expensePayer.userName}
            </li>
            <li>
              <strong>description</strong>: {item.expenseName}
            </li>
            <li>
              <strong>beneficiaries</strong>:{" "}
              {item.expenseBeneficiaries
                .map((beneficiary) => beneficiary.userName)
                .join(", ")}
            </li>
            <li>
              <strong>amount benefitted</strong>:{" "}
              {item.expenseAmountPerBeneficiary.toFixed(2)}€
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
