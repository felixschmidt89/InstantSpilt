import React from "react";
import { useParams, Link } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import useFetchExpenseInfo from "../../hooks/uesFetchExpenseInfo";
import emojiConstants from "../../constants/emojiConstants";
import DeleteResourceButton from "../../components/DeleteResourceButton/DeleteResourceButton";

const ExpensePage = () => {
  const { itemId: expenseId } = useParams(); //
  const expenseDetails = useFetchExpenseInfo(expenseId);

  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />
      <h1>Expense {emojiConstants.expense}</h1>
      {expenseDetails ? (
        <div>
          <h2>{expenseDetails.expenseAmount.toFixed(2)}€</h2>
          <p>Description: {expenseDetails.expenseName}</p>
          <p>
            {emojiConstants.paidFor}{" "}
            <Link to={`/user-page/${expenseDetails.expensePayer._id}`}>
              <strong>{expenseDetails.expensePayer.userName}</strong>
            </Link>
          </p>
          <p>Beneficiaries:</p>
          <ul>
            <li
              key={expenseDetails.expenseBeneficiaries
                .map((beneficiary) => beneficiary._id)
                .join(", ")}>
              {expenseDetails.expenseBeneficiaries.map((beneficiary, index) => (
                <React.Fragment key={beneficiary._id}>
                  {index > 0 && ", "}{" "}
                  <strong>
                    <Link to={`/user-page/${beneficiary._id}`}>
                      {beneficiary.userName}
                    </Link>
                  </strong>
                </React.Fragment>
              ))}
            </li>
          </ul>

          <p>
            {emojiConstants.created}{" "}
            {new Date(expenseDetails.createdAt).toLocaleString()}
          </p>
          <DeleteResourceButton
            resourceId={expenseId}
            resourceType='expenses'
          />
        </div>
      ) : (
        <p>Loading expense information...</p>
      )}
    </main>
  );
};

export default ExpensePage;
