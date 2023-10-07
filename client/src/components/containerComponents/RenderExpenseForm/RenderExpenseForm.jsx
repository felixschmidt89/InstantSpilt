import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RenderExpenseForm.module.css";
import emojiConstants from "../../../constants/emojiConstants";
import commaToDotDecimalSeparatorHelperFunction from "../../../helpers/commaToDotDecimalSeparatorHelper";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function RenderExpenseForm({ groupMembers, groupCode }) {
  const navigate = useNavigate();
  const inputFieldOne = useRef(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [userName, setUserName] = useState("");
  // Preselect all group members as beneficiaries
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);
  const [error, setError] = useState(null); // Declare error state variable

  // Autofocus first input field on mount
  useEffect(() => {
    inputFieldOne.current.focus();
  }, []);

  // controlled first input component to set expenseName state
  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  // controlled second input component to set expenseAmount state, converting comma separator to dot prior to posting
  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(commaToDotDecimalSeparatorHelperFunction(e.target.value));
  };

  // controlled select component to set expenseBeneficiaries state
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBeneficiaries((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedBeneficiaries((prevSelected) =>
        prevSelected.filter((member) => member !== value)
      );
    }
  };

  // On form submission: Post expense and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      await axios.post(`${apiUrl}/expenses`, {
        expenseName,
        expenseAmount,
        groupCode,
        userName,
        expenseBeneficiariesNames: selectedBeneficiaries,
      });
      navigate("/instant-split");
    } catch (error) {
      setError("Error creating expense. Please try again."); // Set error message
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating expense:", error);
      }
    }
  };

  // render back button to abort and input fields, conditionally render submit button
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          {/* Input field for expense name */}
          <div className={styles.container}>
            <input
              className={styles.inputFieldOne}
              type='text'
              value={expenseName}
              onChange={handleExpenseNameChange}
              placeholder='description'
              required
              minLength={3}
              maxLength={50}
              ref={inputFieldOne}
            />
          </div>
          {/* Input field for expense amount */}
          <div>
            <input
              className={styles.inputFieldTwo}
              type='text'
              value={expenseAmount}
              onChange={handleExpenseAmountChange}
              placeholder='0.00'
              required
              pattern='[0-9]+([,.][0-9]{1,2})?'
              inputMode='decimal'
            />
          </div>
          {/* Dropdown to select the expense payer */}
          <select
            className={styles.select}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required>
            <option value='' disabled>
              {emojiConstants.paidFor} by
            </option>
            {/* Map all group members to select beneficiaries */}
            {groupMembers.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
          <h3>Beneficiaries: </h3>
          <div className={styles.beneficiaries}>
            {/* (Un)check beneficiaries */}
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
          {/* Conditionally render submit button when expense amount, name, payer & min 1 beneficiary is given*/}
          {expenseAmount &&
            userName &&
            expenseName &&
            selectedBeneficiaries.length > 0 && (
              <button className={styles.button} type='submit'>
                +
              </button>
            )}
        </div>
      </form>
      {/* Display error message if there's an error */}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}