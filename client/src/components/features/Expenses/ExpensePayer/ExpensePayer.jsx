import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./ExpensePayer.module.css";

const ExpensePayer = ({
  expensePayerName,
  onPayerChange,
  groupMembers,
  setFormChanged,
}) => {
  const handlePayerChange = (e) => {
    onPayerChange(e.target.value);
    if (setFormChanged) {
      setFormChanged(true);
    }
  };
  return (
    <select
      className={styles.select}
      value={expensePayerName}
      onChange={handlePayerChange}
      required>
      {/* Default option */}
      <option value='' disabled>
        {emojiConstants.paidFor} by
      </option>
      {/* Map group members to select beneficiaries */}
      {groupMembers.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  );
};

export default ExpensePayer;
