import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import styles from "./CreateExpensePage.module.css";
import emojiConstants from "../../constants/emojiConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreateExpensePage() {
  const navigate = useNavigate();

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const groupCode = localStorage.getItem("activeGroupCode");
  const groupMembers = useFetchGroupMembers(groupCode);

  // Set all group members as beneficiaries by default
  useEffect(() => {
    setSelectedBeneficiaries([...groupMembers]); //
  }, [groupMembers]);

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
      setExpenseName("");
      setExpenseAmount("");
      setUserName("");
      setSelectedBeneficiaries([...groupMembers]);
      navigate("/instant-split");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error creating expense:", error);
      }
    }
  };

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseAmountChange = (e) => {
    setExpenseAmount(e.target.value);
  };

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
  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h2>Add expense {emojiConstants.expense}</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputFieldOne}
          type='text'
          value={expenseName}
          onChange={handleExpenseNameChange}
          placeholder='expense description'
          required
          minLength={3}
          maxLength={50}
        />
        <span> </span>
        <input
          className={styles.inputFieldTwo}
          type='number'
          value={expenseAmount}
          onChange={handleExpenseAmountChange}
          placeholder='0.00'
          step='0.01'
          min='0.01'
          required
        />
        <span> </span>
        <select
          className={styles.select}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required>
          <option value='' disabled>
            {emojiConstants.paidFor} by
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <h4>for </h4>
        <div className={styles.beneficiaries}>
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
        {expenseName.length >= 3 && (
          <button className={styles.button} type='submit'>
            +
          </button>
        )}
      </form>
    </main>
  );
}
