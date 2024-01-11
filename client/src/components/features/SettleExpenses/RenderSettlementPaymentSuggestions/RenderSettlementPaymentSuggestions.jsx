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
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Object[]} props.negativeBalanceUsers - An array of users with negative balances.
 * @param {Object[]} props.positiveBalanceUsers - An array of users with positive balances.
 * @returns {JSX.Element} - React component.
 */
const RenderSettlementPaymentSuggestions = ({
  negativeBalanceUsers,
  positiveBalanceUsers,
}) => {
  const [settlementPaymentSuggestions, setSettlementPaymentSuggestions] =
    useState([]);

  useEffect(() => {
    setSettlementPaymentSuggestions(
      calculateSuggestedSettlementPayments(
        negativeBalanceUsers,
        positiveBalanceUsers
      )
    );
  }, [negativeBalanceUsers, positiveBalanceUsers]);

  return (
    <div className={styles.container}>
      <ul>
        {settlementPaymentSuggestions.map((settlement, index) => (
          <li key={index} className={styles.paymentSuggestions}>
            <div className={styles.makerAndRecipient}>
              <span aria-label={`Payment maker name`}>{settlement.from} </span>
              <Emoji
                label={"Payment to emoji"}
                emoji={emojiConstants.paymentsMade}></Emoji>{" "}
              <span aria-label={`Payment recipient name`}>
                {settlement.to}{" "}
              </span>
            </div>
            <span
              className={styles.settlementAmount}
              aria-label={`Settlement payment amount`}>
              {settlement.amount}€
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderSettlementPaymentSuggestions;
