// React and Third-Party Libraries
import React, { useRef } from "react";
import { Button } from "@mui/material";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Styles
import styles from "./ExpenseBeneficiariesInput.module.css";
import Emoji from "../../../common/Emoji/Emoji";
import { toggleBeneficiariesButtonStyles } from "../../../../constants/stylesConstants";

/**
 * Component for selecting expense beneficiaries when creating or updating expenses.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.selectedBeneficiaries - The array of selected beneficiaries.
 * @param {string[]} props.groupMembers - An array of group members to populate the options.
 * @param {Function} props.onSelectedBeneficiariesChange - Callback function to handle changes in the selected beneficiaries.
 * @param {boolean} props.isUpdate - Indicates whether it's an update. Indicates whether it's an update. If true, field appears inactive on mount
 * @param {Function} props.setFormChanged - Callback function to indicate form changes.
 * @returns {JSX.Element} React component. */
const ExpenseBeneficiariesInput = ({
  selectedBeneficiaries,
  groupMembers,
  onSelectedBeneficiariesChange,
  setFormChanged,
  isUpdate = false,
}) => {
  const divRef = useRef(null);
  const buttonRef = useRef(null);

  // If update, remove isUpdate class after click on either toggle button or beneficiares div, so that input does not fall back to appearing inactive
  const handleDivOrButtonClick = () => {
    if (isUpdate) {
      divRef.current.classList.remove(styles.isUpdate);
      buttonRef.current.classList.remove(styles.isUpdate);
    }
  };

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
    handleDivOrButtonClick();
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
      <p className={styles.emoji}>
        <Emoji
          label='expense emoji'
          scale={1.15}
          emoji={emojiConstants.expense}
        />
        for
      </p>
      <div
        className={`${styles.beneficiaries} ${isUpdate ? styles.isUpdate : ""}`}
        onClick={handleDivOrButtonClick}
        ref={divRef}>
        <div className={styles.groupMemberNames}>
          {groupMembers.map((member) => (
            <span className={styles.label} key={member}>
              <label>
                <input
                  className={`${styles.input} ${
                    isUpdate ? styles.isUpdate : ""
                  }`}
                  type='checkbox'
                  value={member}
                  checked={selectedBeneficiaries.includes(member)}
                  onChange={handleCheckboxChange}
                />
                {member}
              </label>
            </span>
          ))}
        </div>
        <div className={styles.button}>
          <Button
            onClick={toggleBeneficiaries}
            style={toggleBeneficiariesButtonStyles}
            color='grey'
            variant='outlined'
            ref={buttonRef}>
            {selectedBeneficiaries.length === groupMembers.length
              ? "none"
              : "all"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ExpenseBeneficiariesInput;
