// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";
import emojiConstants from "../../../../constants/emojiConstants";
import { MINIMUM_VALID_AMOUNT } from "../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import ExpenseDescriptionInput from "../ExpenseDescriptionInput/ExpenseDescriptionInput";
import ExpenseAmountInput from "../ExpenseAmountInput/ExpenseAmountInput";
import ExpensePayerSelect from "../ExpensePayerSelect/ExpensePayerSelect";
import ExpenseBeneficiariesInput from "../ExpenseBeneficiariesInput/ExpenseBeneficiariesInput";
import Emoji from "../../../common/Emoji/Emoji";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./UpdateExpense.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component for updating an expense.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.expenseInfo - Information about the expense to be updated.
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @param {Array} props.groupMembers - An array of group members.
 * @param {string} props.expenseId - The unique identifier of the expense.
 * @param {string} [props.route="/instant-split"] - The route to navigate to after updating the expense.
 * @returns {JSX.Element} The rendered Update Expense component.
 */
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

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
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
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error updating expense:", error);
        displayErrorModal();
      }
    }
  };

  return (
    <div>
      <h1 className={styles.header}>
        edit expense{" "}
        <Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>
      </h1>
      <form onSubmit={handleFormSubmit}>
        <ExpenseDescriptionInput
          value={expenseDescription}
          onDescriptionChange={(value) => setExpenseDescription(value)}
          setFormChanged={setFormChanged}
          isUpdate={true}
        />
        <ExpenseAmountInput
          value={expenseAmount}
          onAmountChange={(value) => setExpenseAmount(value)}
          setFormChanged={setFormChanged}
          isUpdate={true}
        />
        <ExpensePayerSelect
          expensePayerName={expensePayerName}
          onPayerChange={(value) => setExpensePayerName(value)}
          groupMembers={groupMembers}
          setFormChanged={setFormChanged}
          isUpdate={true}
        />
        <ExpenseBeneficiariesInput
          selectedBeneficiaries={selectedBeneficiaries}
          groupMembers={groupMembers}
          onSelectedBeneficiariesChange={setSelectedBeneficiaries}
          setFormChanged={setFormChanged}
          isUpdate={true}
        />
        {formChanged && (
          <Button
            style={{
              padding: "0.2rem 0.5rem",
              fontSize: "1.6rem",
              marginTop: "1rem",
              fontFamily: "inherit",
            }}
            variant='contained'
            type='submit'>
            update expense
          </Button>
        )}
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default UpdateExpense;
