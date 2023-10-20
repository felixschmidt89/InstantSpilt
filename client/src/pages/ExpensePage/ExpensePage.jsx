import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchExpenseInfo from "../../hooks/uesFetchExpenseInfo";
import emojiConstants from "../../constants/emojiConstants";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import DeleteResourceButton from "../../components/reuseableComponents/DeleteResourceButton/DeleteResourceButton";
import styles from "./ExpensePage.module.css";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";
import RouteButton from "../../components/reuseableComponents/RouteButton/RouteButton";

const ExpensePage = () => {
  const { itemId: expenseId } = useParams(); //
  const expenseDetails = useFetchExpenseInfo(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Expense details' />
      <PiratePx COUNT_IDENTIFIER={"expense-page/:itemId"} />

      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h1>Expense {emojiConstants.expense}</h1>
      {expenseDetails ? (
        <div>
          <h2>{expenseDetails.expenseAmount.toFixed(2)}€</h2>
          <p>Description: {expenseDetails.expenseName}</p>
          <p>
            {emojiConstants.paidFor}{" "}
            <Link to={`/user-page/${expenseDetails.expensePayer._id}`}>
              {expenseDetails.expensePayer.userName}
            </Link>
          </p>
          <p>Beneficiaries:</p>
          <ul>
            <li
              className={styles.beneficiaries}
              key={expenseDetails.expenseBeneficiaries
                .map((beneficiary) => beneficiary._id)
                .join(", ")}>
              {expenseDetails.expenseBeneficiaries.map((beneficiary, index) => (
                <React.Fragment key={beneficiary._id}>
                  {index > 0 && ", "}{" "}
                  <Link to={`/user-page/${beneficiary._id}`}>
                    {beneficiary.userName}
                  </Link>
                </React.Fragment>
              ))}
            </li>
          </ul>
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
