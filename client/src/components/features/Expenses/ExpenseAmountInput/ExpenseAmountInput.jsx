import React from "react";
import { commaToDotDecimalSeparator } from "../../../../utils/formatUtils";
import styles from "./ExpenseAmountInput.module.css";

/**
 * Input component for handling expense amount when creating or updating expenses.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onAmountChange - Function to handle amount changes.
 * @param {Function} props.setFormChanged - Callback function to indicate changes in the form.
 * @returns {JSX.Element} - Rendered component.
 */
const ExpenseAmountInput = ({ value, onAmountChange, setFormChanged }) => {
  // controlled input component to set expense amount state in parent component, converting comma separator to dot prior to posting
  const handleExpenseAmountChange = (e) => {
    onAmountChange(commaToDotDecimalSeparator(e.target.value));
    if (setFormChanged) {
      setFormChanged(true);
    }
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

export default ExpenseAmountInput;
