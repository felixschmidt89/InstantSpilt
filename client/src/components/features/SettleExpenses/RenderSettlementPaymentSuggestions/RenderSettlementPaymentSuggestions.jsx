// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import Emoji from "../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderSettlementPaymentSuggestions.module.css";

/**
 * Component for rendering settlement payment suggestions.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Object[]} props.settlements - An array of settlement objects.
 * @returns {JSX.Element} - React component.
 */
const RenderSettlementPaymentSuggestions = ({ settlements }) => {
  return (
    <div className={styles.container}>
      <ul>
        {settlements.map((settlement, index) => (
          <li key={index} className={styles.paymentSuggestions}>
            <span>
              {settlement.from}{" "}
              <Emoji
                label={"Payment to someone emoji"}
                emoji={emojiConstants.paymentsMade}></Emoji>{" "}
              {settlement.to}:
            </span>{" "}
            <span className={styles.settlementAmount}>
              {settlement.amount}€
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RenderSettlementPaymentSuggestions;
