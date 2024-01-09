import React from "react";
import styles from "./PaymentRecipientSelect.module.css";

/**
 * Select component for selecting the payment recipient when creating or updating payments.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.paymentRecipientName - The name of the selected payment recipient.
 * @param {Function} props.onRecipientChange - Callback function to handle changes in the selected payment recipient.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 * @returns {JSX.Element} - Rendered component.
 */
const PaymentRecipientSelect = ({
  paymentRecipientName,
  onRecipientChange,
  groupMembers,
}) => {
  const options = groupMembers.map((member) => (
    <option key={member} value={member}>
      {member}
    </option>
  ));

  return (
    <select
      className={styles.paymentRecipient}
      value={paymentRecipientName}
      onChange={(e) => onRecipientChange(e.target.value)}
      required>
      {/* Do not preselect user, indicate functionality instead */}
      <option value='' disabled>
        to
      </option>
      {options}
    </select>
  );
};

export default PaymentRecipientSelect;
