import React from "react";
import styles from "./PaymentRecipient.module.css";

const PaymentRecipient = ({
  paymentRecipientName,
  onRecipientChange,
  groupMembers,
}) => {
  // Ensure that groupMembers is an array before using map
  const options = Array.isArray(groupMembers)
    ? groupMembers.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))
    : null;

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

export default PaymentRecipient;
