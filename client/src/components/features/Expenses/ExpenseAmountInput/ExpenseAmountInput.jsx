// React and Third-Party Libraries
import React, { useRef } from "react";

// Constants and Utils
import { commaToDotDecimalSeparator } from "../../../../utils/formatUtils";

// Styles
import styles from "./ExpenseAmountInput.module.css";

/**
 * Input component for handling expense amount when creating or updating expenses.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onAmountChange - Function to handle amount changes.
 * @param {Function} props.setFormChanged - Callback function to indicate changes in the form.
 *  @param {boolean} props.isUpdate - Indicates whether it's an update. If true, field appears inactive on mount
 * @returns {JSX.Element} React component. */
const ExpenseAmountInput = ({
  value,
  onAmountChange,
  setFormChanged,
  isUpdate = false,
}) => {
  const inputRef = useRef(null);

  // If update, remove isUpdate class after click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    if (isUpdate && inputRef.current) {
      inputRef.current.classList.remove(styles.isUpdate);
    }
  };

  const handleExpenseAmountChange = (e) => {
    // update expense amount state and convert separator
    onAmountChange(commaToDotDecimalSeparator(e.target.value));
    if (setFormChanged) {
      setFormChanged(true);
    }
  };
  return (
    <div>
      <input
        className={`${styles.amount} ${isUpdate ? styles.isUpdate : ""}`}
        type='text'
        value={value}
        onClick={handleInputClick}
        onChange={handleExpenseAmountChange}
        ref={inputRef}
        placeholder='0.00'
        inputMode='decimal'
      />
    </div>
  );
};

export default ExpenseAmountInput;
