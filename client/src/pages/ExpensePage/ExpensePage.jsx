import React from "react";
import { useParams, Link } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

import emojiConstants from "../../constants/emojiConstants";

import useFetchExpenseInfo from "../../hooks/useFetchExpenseInfo";

import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import DeleteResourceButton from "../../components/common/DeleteResourceButton/DeleteResourceButton";
import RouteButton from "../../components/common/RouteButton/RouteButton";

import styles from "./ExpensePage.module.css";

/**
 * Page for displaying expense details.
 *
 * @component
 * @returns {JSX.Element} - The rendered ExpensePage component.
 */
const ExpensePage = () => {
  // useParams hook to extract and rename the 'itemId' parameter from the current URL
  const { itemId: expenseId } = useParams();
  // fetch expense details
  const expenseDetails = useFetchExpenseInfo(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - expense details' />
      <PiratePx COUNT_IDENTIFIER={"expense-page"} />
      {/* NavigateButton component for returning to the main page */}
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h1>Expense {emojiConstants.expense}</h1>
      {/* Conditional rendering based on whether expenseDetails is available */}
      {expenseDetails ? (
        <div>
          {/* Displaying expense details with 2 decimal places */}
          <h2>{expenseDetails.expenseAmount.toFixed(2)}€</h2>
          <p>Description: {expenseDetails.expenseName}</p>
          <p>
            {emojiConstants.paidFor}{" "}
            {/* Link to the user page of the expense payer */}
            <Link to={`/user-page/${expenseDetails.expensePayer._id}`}>
              {expenseDetails.expensePayer.userName}
            </Link>
          </p>
          {/* Displaying beneficiaries list */}
          <p>Beneficiaries:</p>
          <ul>
            <li
              className={styles.beneficiaries}
              // Generating a unique key for the list item based on beneficiary IDs
              key={expenseDetails.expenseBeneficiaries
                .map((beneficiary) => beneficiary._id)
                .join(", ")}>
              {expenseDetails.expenseBeneficiaries.map((beneficiary, index) => (
                // Using a React.Fragment to wrap multiple elements without adding extra nodes
                <React.Fragment key={beneficiary._id}>
                  {/* Adding a comma and space between beneficiaries (except for the first one) */}
                  {index > 0 && ", "}{" "}
                  {/* Link to the user page of each beneficiary */}
                  <Link to={`/user-page/${beneficiary._id}`}>
                    {beneficiary.userName}
                  </Link>
                </React.Fragment>
              ))}
            </li>
          </ul>
          {/* Displaying creation date */}
          <p>
            {emojiConstants.created}{" "}
            {new Date(expenseDetails.createdAt).toLocaleString()}
          </p>
          <RouteButton route={`update-expense/${expenseId}`} />
          <DeleteResourceButton
            resourceId={expenseId}
            resourceType='expenses'
          />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default ExpensePage;
