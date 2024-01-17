import React from "react";
import styles from "./PaymentMakerSelect.module.css";

/**
 * Component for selecting payment maker when creating or updating payments.
 * @param {Object} props - The component props.
 * @param {string} props.paymentMakerName - The name of the selected payment maker.
 * @param {Function} props.onPaymentMakerChange - Callback function to handle changes in the selected payment maker.
 * @param {string[]} props.groupMembers - ASelect cn array of group members to populate the options.
 * @returns {JSX.Element} React component. */
const PaymentMakerSelect = ({
  paymentMakerName,
  onPaymentMakerChange,
  groupMembers,
}) => {
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
      {groupMembers.map((member) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>
  );
};

export default PaymentMakerSelect;
