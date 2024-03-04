// React and Third-Party Libraries
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { validateAndProcessAmountInput } from "../../../../utils/formatUtils";

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
  const { t } = useTranslation();

  // If update, remove isUpdate class after click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    if (isUpdate && inputRef.current) {
      inputRef.current.classList.remove(styles.isUpdate);
    }
  };

  const handleExpenseAmountChange = (e) => {
    onAmountChange(validateAndProcessAmountInput(e.target.value));
    if (setFormChanged) {
      setFormChanged(true);
    }
  };
  return (
    <div className={styles.container}>
      <input
        className={`${styles.amount} ${isUpdate ? styles.isUpdate : ""}`}
        type='text'
        value={value}
        onClick={handleInputClick}
        onChange={handleExpenseAmountChange}
        ref={inputRef}
        placeholder={t("expense-amount-input-placeholder")}
        inputMode='decimal'
      />
    </div>
  );
};

export default ExpenseAmountInput;
