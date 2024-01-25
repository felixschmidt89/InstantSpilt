// React and Third-Party Libraries
import React, { useEffect, useState } from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";
import { calculateSuggestedSettlementPayments } from "../../../../utils/settlementUtils";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderSettlementPaymentSuggestions.module.css";

/**
 * Component for rendering settlement payment suggestions.
 *
 * @param {Object} props - The properties of the component.
 * @param {Object[]} props.negativeBalanceUsers - An array of users with negative balances.
 * @param {Object[]} props.positiveBalanceUsers - An array of users with positive balances.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const RenderSettlementPaymentSuggestions = ({
  positiveBalanceUsers,
  negativeBalanceUsers,
  groupCurrency,
}) => {
  const [settlementPaymentSuggestions, setSettlementPaymentSuggestions] =
    useState([]);

  useEffect(() => {
    setSettlementPaymentSuggestions(
      calculateSuggestedSettlementPayments(
        positiveBalanceUsers,
        negativeBalanceUsers
      )
    );
  }, [negativeBalanceUsers, positiveBalanceUsers]);

  return (
    <div className={styles.container}>
      <h2>settlement suggestions</h2>

      <ul>
        {settlementPaymentSuggestions.map((settlement, index) => (
          <li key={index} className={styles.paymentSuggestions}>
            <div className={styles.makerAndRecipient}>
              <span aria-label={`Payment maker name`}>{settlement.from} </span>
              <Emoji
                label={"payment to other user emoji"}
                emoji={emojiConstants.paymentsMade}></Emoji>{" "}
              <span aria-label={`Payment recipient name`}>
                {settlement.to}{" "}
              </span>
            </div>
            <span
              className={styles.settlementAmount}
              aria-label={`Settlement payment amount`}>
              {settlement.amount}
              {groupCurrency}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderSettlementPaymentSuggestions;
