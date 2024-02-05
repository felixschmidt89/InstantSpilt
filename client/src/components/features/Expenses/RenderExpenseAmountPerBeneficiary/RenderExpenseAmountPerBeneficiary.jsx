// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./RenderExpenseAmountPerBeneficiary.module.css";

/**
 * Renders expense amount per beneficiary.
 *
 * @param {string} expenseAmountPerBeneficiary - the amount per beneficiary.
 * @param {string} groupCurrency - The currency of the group.

 * @returns {JSX.Element} React component. */
const RenderExpenseAmountPerBeneficiary = ({
  expenseAmountPerBeneficiary,
  groupCurrency,
}) => {
  return (
    <div className={styles.container}>
      <p>
        <strong>amount per beneficiary</strong>:{" "}
        {expenseAmountPerBeneficiary.toFixed(2)}
        {groupCurrency}
      </p>
    </div>
  );
};

export default RenderExpenseAmountPerBeneficiary;
