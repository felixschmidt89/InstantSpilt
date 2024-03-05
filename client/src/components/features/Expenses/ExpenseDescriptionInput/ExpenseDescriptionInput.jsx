// React and Third-Party Libraries
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./ExpenseDescriptionInput.module.css";

/**
 * Input component for handling expense description when creating or updating expenses.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onDescriptionChange - Callback function to handle changes in the input.
 * @param {Function} props.setFormChanged - Callback function to indicate changes in the form.
 * @param {boolean} props.isUpdate - Indicates whether it's an update. If true, no autofocus on mount and little different CSS style
 * @returns {JSX.Element} React component. */
const ExpenseDescriptionInput = ({
  value,
  onDescriptionChange,
  setFormChanged,
  isUpdate = false,
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();

  // Autofocus input field on mount if isUpdate is false
  useEffect(() => {
    if (!isUpdate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUpdate, inputRef]);

  // If update, remove isUpdate class after click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    if (isUpdate && inputRef.current) {
      inputRef.current.classList.remove(styles.isUpdate);
    }
  };

  const handleExpenseDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
    if (setFormChanged) {
      setFormChanged(true);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={`${styles.description} ${isUpdate ? styles.isUpdate : ""}`}
        type='text'
        value={value}
        onClick={handleInputClick}
        onChange={handleExpenseDescriptionChange}
        placeholder={t("expense-description-input-placeholder")}
        ref={inputRef}
      />
    </div>
  );
};

export default ExpenseDescriptionInput;
