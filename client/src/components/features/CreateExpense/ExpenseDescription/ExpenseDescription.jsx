import React, { useEffect, useRef } from "react";
import styles from "./ExpenseDescription.module.css";

/**
 * ExpenseDescription component for rendering expense description input field with autofocus on mount.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the input field.
 * @param {Function} props.onChange - The callback function for handling input changes.
 * @param {React.RefObject} props.inputRef - The ref for the input element.
 * @returns {JSX.Element} - The rendered ExpenseDescription component.
 */
const ExpenseDescription = ({ value, onDescriptionChange }) => {
  const inputRef = useRef(null);

  // Autofocus input field on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  // controlled input component to set expenseDescription state
  const handleExpenseDescriptionChange = (e) => {
    onDescriptionChange(e.target.value);
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

export default ExpenseDescription;
