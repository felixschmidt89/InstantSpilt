import React from "react";
import { Link } from "react-router-dom";
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
      <ul className={styles.beneficiariesList}>
        {expenseBeneficiaries.map((beneficiary, index) => (
          <li key={beneficiary._id} className={styles.beneficiary}>
            {/* Display a comma and space between beneficiaries (except for the first one) */}
            {index > 0 && ", "}
            {/* Link to the user page of each beneficiary */}
            <Link to={`/user-details/${beneficiary._id}`}>
              {beneficiary.userName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderExpenseBeneficiaries;
