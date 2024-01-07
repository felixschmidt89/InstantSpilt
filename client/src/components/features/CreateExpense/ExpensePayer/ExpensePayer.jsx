import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./ExpensePayer.module.css";

/**
 * ExpensePayer component for rendering a dropdown to select the expense payer.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.userName - The currently selected username as the expense payer.
 * @param {Function} props.onPayerChange - The callback function for handling payer changes.
 * @param {string[]} props.groupMembers - The list of group members to populate the dropdown options.
 * @returns {JSX.Element} - The rendered ExpensePayer component.
 */
const ExpensePayer = ({ expensePayerName, onPayerChange, groupMembers }) => {
  return (
    <select
      className={styles.select}
      value={expensePayerName}
      onChange={(e) => onPayerChange(e.target.value)}
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
