import React from "react";
import { commaToDotDecimalSeparator } from "../../../../utils/formatUtils";
import styles from "./ExpenseAmount.module.css";

const ExpenseAmount = ({ value, onAmountChange }) => {
  const handleExpenseAmountChange = (e) => {
    onAmountChange(commaToDotDecimalSeparator(e.target.value));
  };
  return (
    <div>
      <input
        className={styles.amount}
        type='text'
        value={value}
        onChange={handleExpenseAmountChange}
        placeholder='0.00'
        inputMode='decimal'
        pattern='[0-9]+([,.][0-9]{1,2})?'
        title='Only digits, ".", and "," are allowed. Maximum value is 9999.99.'
      />
    </div>
  );
};

export default ExpenseAmount;
