import React, { useEffect, useRef } from "react";
import styles from "./ExpenseDescription.module.css";

const ExpenseDescription = ({ value, onDescriptionChange, setFormChanged }) => {
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

export default ExpenseDescription;
