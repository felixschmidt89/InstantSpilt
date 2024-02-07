// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import SubmitButton from "../../../common/SubmitButton/SubmitButton";

// Styles
import styles from "./CreateExpense.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component for creating a new expense.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.groupMembers - An array of group members.
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} React component. */
const CreateExpense = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayerName, setExpensePayerName] = useState("");
  // Preselect all group members as beneficiaries
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([
    ...groupMembers,
  ]);
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error creating expense:", error);
        displayErrorModal();
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
          <SubmitButton buttonText='add expense' />
        </div>
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default CreateExpense;
