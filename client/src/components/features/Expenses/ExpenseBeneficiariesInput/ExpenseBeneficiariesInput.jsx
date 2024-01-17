import React from "react";
import styles from "./ExpenseBeneficiariesInput.module.css";

/**
 * Component for selecting expense beneficiaries when creating or updating expenses.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.selectedBeneficiaries - The array of selected beneficiaries.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 * @param {Function} props.onSelectedBeneficiariesChange - Callback function to handle changes in the selected beneficiaries.
 * @param {Function} props.setFormChanged - Callback function to indicate form changes.
 * @returns {JSX.Element} React component. */
const ExpenseBeneficiariesInput = ({
  selectedBeneficiaries,
  groupMembers,
  onSelectedBeneficiariesChange,
  setFormChanged,
}) => {
  const handleCheckboxChange = (e) => {
    // Extract 'value' and 'checked' properties from the checkbox input
    const { value, checked } = e.target;
    // Update selected beneficiaries based on the checkbox state
    onSelectedBeneficiariesChange(
      checked
        ? [...selectedBeneficiaries, value] // Add value to the array if checked
        : selectedBeneficiaries.filter((member) => member !== value) // remove the value if unchecked
    );
    if (setFormChanged) {
      setFormChanged(true);
    }
  };

  const toggleBeneficiaries = () => {
    // Toggle between selecting all and clearing selected beneficiaries
    onSelectedBeneficiariesChange(
      selectedBeneficiaries.length === groupMembers.length
        ? [] // If all beneficiaries are selected, clear the selection
        : [...groupMembers] // Else, select all beneficiaries
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
        {/* Display "none" if all beneficiaries are currently selected, otherwise display "all" */}
        {selectedBeneficiaries.length === groupMembers.length ? "none" : "all"}
      </button>
      <div className={styles.beneficiaries}>
        <div>
          {groupMembers.map((member) => (
            <label className={styles.label} key={member}>
              <input
                type='checkbox'
                value={member}
                // Set the 'checked' attribute of the checkbox based on whether the current 'member' is included in the 'selectedBeneficiaries' array.
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

export default ExpenseBeneficiariesInput;
