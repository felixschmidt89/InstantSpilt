// React and Third-Party Libraries
import React from "react";

// Styles
import styles from "./RenderExpenseBeneficiaries.module.css";

/**
 * Renders a list of expense beneficiaries.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.expenseBeneficiaries - The array of expense beneficiaries.
 * @returns {JSX.Element} React component. */
const RenderExpenseBeneficiaries = ({ expenseBeneficiaries }) => {
  return (
    <div className={styles.container}>
      <h2>Beneficiaries:</h2>
      <div className={styles.beneficiariesList}>
        {expenseBeneficiaries.map((beneficiary, index) => (
          <span key={beneficiary._id} className={styles.beneficiary}>
            <span className={styles.noWrap}>{beneficiary.userName}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default RenderExpenseBeneficiaries;
