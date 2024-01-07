import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { commaToDotDecimalSeparator } from "../../../utils/formatUtils";
import emojiConstants from "../../../constants/emojiConstants";
import { devLog } from "../../../utils/errorUtils";
import styles from "./CreateExpense.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateExpense = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();
  const inputFieldOne = useRef(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [userName, setUserName] = useState("");

  const [error, setError] = useState(null);
  // Preselect all group members as beneficiaries
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);

  const isSubmitButtonVisible =
    expenseAmount &&
    userName &&
    expenseName &&
    selectedBeneficiaries.length > 0;

  // Log props for debugging in development environment
  devLog("groupMembers:", groupMembers);
  devLog("groupCode:", groupCode);

  // Autofocus first input field on mount
  useEffect(() => {
    if (inputFieldOne.current) {
      inputFieldOne.current.focus();
    }
  }, [inputFieldOne]);

  // controlled first input component to set expenseName state
  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  // controlled second input component to set expenseAmount state, converting comma separator to dot prior to posting
  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(commaToDotDecimalSeparator(e.target.value));
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

  const toggleBeneficiaries = () => {
    if (selectedBeneficiaries.length === groupMembers.length) {
      // If all are selected, deselect all
      setSelectedBeneficiaries([]);
    } else {
      // If not all are selected, select all
      setSelectedBeneficiaries([...groupMembers]);
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
      if (error.response) {
        if (error.response.status === 400) {
          console.log(error.response);
          setError(error.response.data.errors[0].message);
        } else {
          setError("Error creating expense. Please try again.");
          devLog("Error creating expense:", error);
        }
      }
    }
  };

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
          <button
            className={styles.toggleButton}
            type='button' // Set the type to "button" to prevent form submission
            onClick={toggleBeneficiaries}>
            {selectedBeneficiaries.length === groupMembers.length
              ? "none"
              : "all"}
          </button>
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
          {/* Conditionally render submit button */}
          {isSubmitButtonVisible && (
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
};

export default CreateExpense;
