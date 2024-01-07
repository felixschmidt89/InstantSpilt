import React from "react";
import styles from "./ExpenseBeneficiaries.module.css";

const ExpenseBeneficiaries = ({
  selectedBeneficiaries,
  groupMembers,
  onSelectedBeneficiariesChange,
  setFormChanged,
}) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    onSelectedBeneficiariesChange(
      checked
        ? [...selectedBeneficiaries, value]
        : selectedBeneficiaries.filter((member) => member !== value)
    );
    if (setFormChanged) {
      setFormChanged(true);
    }
  };

  const toggleBeneficiaries = () => {
    onSelectedBeneficiariesChange(
      selectedBeneficiaries.length === groupMembers.length
        ? []
        : [...groupMembers]
    );
    if (setFormChanged) {
      setFormChanged(true);
    }
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
