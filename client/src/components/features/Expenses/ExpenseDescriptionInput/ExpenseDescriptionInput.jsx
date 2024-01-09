import React, { useEffect, useRef } from "react";
import styles from "./ExpenseDescriptionInput.module.css";

/**
 * Input component for handling expense description when creating or updating expenses.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the input.
 * @param {Function} props.onDescriptionChange - Callback function to handle changes in the input.
 * @param {Function} props.setFormChanged - Callback function to indicate changes in the form.
 * @returns {JSX.Element} - Rendered component.
 */
const ExpenseDescriptionInput = ({
  value,
  onDescriptionChange,
  setFormChanged,
}) => {
  const inputRef = useRef(null);

  // Autofocus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleExpenseDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
    if (setFormChanged) {
      setFormChanged(true);
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.description}
        type='text'
        value={value}
        onChange={handleExpenseDescriptionChange}
        placeholder='description'
        ref={inputRef}
      />
    </div>
  );
};

export default ExpenseDescriptionInput;
