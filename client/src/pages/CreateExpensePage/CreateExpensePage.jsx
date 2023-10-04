// DONE: adding only meaningful necessary comments

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import styles from "./CreateExpensePage.module.css";
import emojiConstants from "../../constants/emojiConstants";
import commaToDotDecimalSeparatorHelper from "../../helpers/commaToDotDecimalSeparatorHelper";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreateExpensePage() {
  const navigate = useNavigate();
  const inputFieldOne = useRef(null);

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const groupCode = localStorage.getItem("activeGroupCode");
  const groupMembers = useFetchGroupMembers(groupCode);

  // Autofocus first input field on mount
  useEffect(() => {
    inputFieldOne.current.focus();
  }, []);

  // Set all group members as beneficiaries on mount
  useEffect(() => {
    setSelectedBeneficiaries([...groupMembers]);
  }, [groupMembers]);

  // On form submission: Post expense and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const groupCode = localStorage.getItem("activeGroupCode");
      await axios.post(`${apiUrl}/expenses`, {
        expenseName,
        expenseAmount,
        groupCode,
        userName,
        expenseBeneficiariesNames: selectedBeneficiaries,
      });
      setIsLoading(false);
      navigate("/instant-split");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating expense:", error);
        setIsLoading(false);
      }
    }
  };

  // controlled first input component to set expenseName state
  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  // controlled second input component to set expenseAmount state, converting comma separator to dot prior to posting
  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(commaToDotDecimalSeparatorHelper(e.target.value));
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

  // render back button to abort and input fields, conditionally render submit button
  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h2 className={styles.header}>Add expense {emojiConstants.expense}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Input field for expense name */}
          <div>
            <input
              className={styles.inputFieldOne}
              type='text'
              value={expenseName}
              onChange={handleExpenseNameChange}
              placeholder='expense description'
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
              inputMode='numeric'
            />
          </div>
          {/* Dropdown to select the expense paye r */}
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
        </form>
      )}
    </main>
  );
}
