import React from "react";
import styles from "./PaymentMaker.module.css";

const PaymentMaker = ({
  paymentMakerName,
  onPaymentMakerChange,
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
      className={styles.paymentMaker}
      value={paymentMakerName}
      onChange={(e) => onPaymentMakerChange(e.target.value)}
      required>
      {/* Do not preselect user, indicate functionality instead */}
      <option value='' disabled>
        by
      </option>
      {options}
    </select>
  );
};

export default PaymentMaker;
