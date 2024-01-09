// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Components
import ExpenseBeneficiaries from "../ExpenseBeneficiaries/ExpenseBeneficiaries";
import ExpensePayer from "../ExpensePayer/ExpensePayer";
import ExpenseAmount from "../ExpenseAmount/ExpenseAmount";
import ExpenseDescription from "../ExpenseDescription/ExpenseDescription";

// Styles
import styles from "./UpdateExpense.module.css";

// API
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UpdateExpense = ({
  expenseInfo,
  groupCode,
  groupMembers,
  expenseId,
  route = "/instant-split",
}) => {
  const navigate = useNavigate();

  // Values stored in database
  const storedExpenseDescription = expenseInfo.expenseDescription;
  const storedExpenseAmount = expenseInfo.expenseAmount;
  const storedExpensePayerName = expenseInfo.expensePayer.userName;
  const storedBeneficiariesNames = expenseInfo.expenseBeneficiaries.map(
    (beneficiary) => beneficiary.userName
  );

  // States to manage to be updated properties
  const [expenseDescription, setExpenseDescription] = useState(
    storedExpenseDescription
  );
  const [expenseAmount, setExpenseAmount] = useState(storedExpenseAmount);
  const [expensePayerName, setExpensePayerName] = useState(
    storedExpensePayerName
  );
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState(
    storedBeneficiariesNames
  );

  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState(null);

  const isSubmitButtonVisible =
    formChanged &&
    expenseAmount &&
    expensePayerName &&
    expenseDescription &&
    selectedBeneficiaries.length > 0;

  // On form submission: Put expense and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error

    try {
      const response = await axios.put(`${apiUrl}/expenses/${expenseId}`, {
        expenseDescription,
        expenseAmount,
        groupCode,
        expensePayerName,
        expenseBeneficiariesNames: selectedBeneficiaries,
        storedExpensePayerName,
        storedBeneficiariesNames,
      });
      devLog("Expense updated:", response);
      navigate(route);
    } catch (error) {
      if (error.response) {
        // Handle bad requests
        if (error.response.status === 400) {
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
          <ExpenseDescription
            value={expenseDescription}
            onDescriptionChange={(value) => setExpenseDescription(value)}
            setFormChanged={setFormChanged}
          />
          <ExpenseAmount
            value={expenseAmount}
            onAmountChange={(value) => setExpenseAmount(value)}
            setFormChanged={setFormChanged}
          />
          <ExpensePayer
            expensePayerName={expensePayerName}
            onPayerChange={(value) => setExpensePayerName(value)}
            groupMembers={groupMembers}
            setFormChanged={setFormChanged}
          />
          <ExpenseBeneficiaries
            selectedBeneficiaries={selectedBeneficiaries}
            groupMembers={groupMembers}
            onSelectedBeneficiariesChange={setSelectedBeneficiaries}
            setFormChanged={setFormChanged}
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

export default UpdateExpense;
