import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./RenderExpenseUpdateForm.module.css";
import emojiConstants from "../../../constants/emojiConstants";
import commaToDotDecimalSeparatorHelperFunction from "../../../helpers/commaToDotDecimalSeparatorHelper";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function RenderExpenseUpdateForm({
  expenseInfo,
  groupCode,
  groupMembers,
  expenseId,
}) {
  const navigate = useNavigate();
  const inputFieldOne = useRef(null);
  const [expenseName, setExpenseName] = useState(expenseInfo.expenseName);
  const [expenseAmount, setExpenseAmount] = useState(expenseInfo.expenseAmount);
  const [userName, setUserName] = useState(expenseInfo.expensePayer.userName);
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState(
    expenseInfo.expenseBeneficiaries.map((beneficiary) => beneficiary.userName)
  );

  console.log(expenseInfo, groupCode, groupMembers, expenseId);
  // Define a state variable to track changes
  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState(null);

  // controlled first input component to set expenseName state
  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
    setFormChanged(true); // Set formChanged to true when the input changes
  };

  // controlled second input component to set expenseAmount state, converting comma separator to dot prior to posting
  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(commaToDotDecimalSeparatorHelperFunction(e.target.value));
    setFormChanged(true); // Set formChanged to true when the input changes
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
    setFormChanged(true); // Set formChanged to true when the input changes
  };

  // On form submission: Post expense and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      await axios.put(`${apiUrl}/expenses/${expenseId}`, {
        expenseName,
        expenseAmount,
        groupCode,
        userName,
        expenseBeneficiariesNames: selectedBeneficiaries,
        associatedUsers: expenseInfo.associatedUsers,
      });
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        // Handle bad requests
        if (error.response.status === 400) {
          console.log(error.response);
          setError(error.response.data.errors[0].message);
        } else {
          setError("Error creating expense. Please try again."); // Set error message
          if (process.env.NODE_ENV === "development") {
            console.error("Error creating expense:", error);
          }
        }
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
              inputMode='decimal'
              pattern='[0-9]+([,.][0-9]{1,2})?'
              title='Only digits, ".", and "," are allowed. Maximum value is 9999.99.'
            />
          </div>
          {/* Dropdown to select the expense payer */}
          <select
            className={styles.select}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setFormChanged(true); // Set formChanged to true when the input changes
            }}
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
          {/* Conditionally render button when there has been a change */}
          {formChanged && (
            <button className={styles.button} type='submit'>
              update
            </button>
          )}
        </div>
      </form>
      {/* Display error message if there's an error */}
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
