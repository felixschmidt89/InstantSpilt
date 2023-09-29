import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function CreateExpensePage() {
  const navigate = useNavigate();

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const groupCode = localStorage.getItem("activeGroupCode");
  const groupMembers = useFetchGroupMembers(groupCode);

  useEffect(() => {
    // Preselect all group members when the component mounts
    setSelectedBeneficiaries([...groupMembers]); // Copy all group members to selectedBeneficiaries
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
      <NavigateButton route={"instant-split"} buttonText={"back"} />
      <h2>Add Expense</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={expenseName}
          onChange={handleExpenseNameChange}
          placeholder='Expense Name'
          required
          minLength={3}
          maxLength={50}
        />
        <input
          type='number'
          value={expenseAmount}
          onChange={handleExpenseAmountChange}
          placeholder='Amount'
          required
          step='0.01'
          min='0.01'
        />
        <select
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required>
          <option value='' disabled>
            By
          </option>
          {groupMembers.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <div>
          <h4>For</h4>
          {groupMembers.map((member) => (
            <label key={member}>
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
          <button type='submit' style={{ marginLeft: "10px", padding: "2px" }}>
            Add
          </button>
        )}
      </form>
    </main>
  );
}
