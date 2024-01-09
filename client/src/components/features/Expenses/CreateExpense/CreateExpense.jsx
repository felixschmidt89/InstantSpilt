// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Hooks

// Components
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";

// Styles
import styles from "./CreateExpense.module.css";

// API
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateExpense = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayerName, setExpensePayerName] = useState("");
  const [error, setError] = useState(null);
  // Preselect all group members as beneficiaries
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);

  const isSubmitButtonVisible =
    expenseAmount &&
    expensePayerName &&
    expenseDescription &&
    selectedBeneficiaries.length > 0;

  // On form submission: Post expense and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    try {
      const response = await axios.post(`${apiUrl}/expenses`, {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerName,
        expenseBeneficiariesNames: selectedBeneficiaries,
      });
      devLog("Expense created:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          devLog("Error creating expense:", error.response);
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
        <div className={styles.container}>
          <ExpenseDescriptionInput
            value={expenseDescription}
            onDescriptionChange={(value) => setExpenseDescription(value)}
          />
          <ExpenseAmountInput
            value={expenseAmount}
            onAmountChange={(value) => setExpenseAmount(value)}
          />
          <ExpensePayerSelect
            expensePayerName={expensePayerName}
            onPayerChange={(value) => setExpensePayerName(value)}
            groupMembers={groupMembers}
          />
          <ExpenseBeneficiariesInput
            selectedBeneficiaries={selectedBeneficiaries}
            groupMembers={groupMembers}
            onSelectedBeneficiariesChange={setSelectedBeneficiaries}
          />
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
