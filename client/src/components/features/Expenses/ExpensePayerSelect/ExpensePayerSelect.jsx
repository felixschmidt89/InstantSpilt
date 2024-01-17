// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./ExpensePayerSelect.module.css";

/**
 * Component for selecting expense payer when creating or updating expenses.
 *
 * @param {Object} props - The component props.
 * @param {string} props.expensePayerName - The name of the selected expense payer.
 * @param {Function} props.onPayerChange - Callback function to handle changes in the selected expense payer.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 * @param {Function} props.setFormChanged - Callback function to indicate changes in the form.
 * @returns {JSX.Element} React component. */
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
        <Emoji label={"Paid for emoji"} emoji={emojiConstants.paidBy}></Emoji>{" "}
        by
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
