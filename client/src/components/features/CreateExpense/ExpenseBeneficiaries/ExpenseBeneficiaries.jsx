import React from "react";
import styles from "./ExpenseBeneficiaries.module.css";

const ExpenseBeneficiaries = ({
  selectedBeneficiaries,
  groupMembers,
  onSelectedBeneficiariesChange,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      onSelectedBeneficiariesChange([...selectedBeneficiaries, value]);
    } else {
      onSelectedBeneficiariesChange(
        selectedBeneficiaries.filter((member) => member !== value)
      );
    }
  };

  const toggleBeneficiaries = () => {
    onSelectedBeneficiariesChange(
      selectedBeneficiaries.length === groupMembers.length
        ? []
        : [...groupMembers]
    );
  };

  return (
    <>
      <h3>Beneficiaries: </h3>
      <button
        className={styles.toggleButton}
        type='button'
        onClick={toggleBeneficiaries}>
        {selectedBeneficiaries.length === groupMembers.length ? "none" : "all"}
      </button>
      <div className={styles.beneficiaries}>
        <div>
          {groupMembers.map((member) => (
            <label className={styles.label} key={member}>
              <input
                type='checkbox'
                value={member}
                checked={selectedBeneficiaries.includes(member)}
                onChange={handleCheckboxChange}
              />
              {member}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExpenseBeneficiaries;
