import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./ExpensePayerSelect.module.css";

/**
 * Component for selecting expense payer when creating or updating expenses.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.expensePayerName - The name of the selected expense payer.
 * @param {Function} props.onPayerChange - Callback function to handle changes in the selected expense payer.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 * @param {Function} props.setFormChanged - Callback function to indicate changes in the form.
 * @returns {JSX.Element} - Rendered component.
 */
const ExpensePayerSelect = ({
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
        {emojiConstants.paidBy} by
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

export default ExpensePayerSelect;
