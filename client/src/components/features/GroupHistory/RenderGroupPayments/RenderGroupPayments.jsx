import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import styles from "./RenderGroupPayments.module.css";

/**
 * Component for displaying single group payments.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.item - The payment item to be rendered.
 * @returns {JSX.Element} - Rendered component.
 */
const RenderGroupPayments = ({ item }) => {
  return (
    <div className={styles.payments}>
      {/* Left column with payment emoji and amount */}
      <div className={styles.leftColumn}>
        <div className={styles.paymentEmoji}>{emojiConstants.payment}</div>
        <div className={styles.paymentAmount}>
          {/* Link to the item page with item details */}
          <Link
            to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            {/* {item.paymentAmount.toFixed(2)}€ */}
            {item.paymentAmount}€
          </Link>
        </div>
      </div>
      {/* Right column with payment maker, emoji, and payment recipient */}
      <div className={styles.rightColumn}>
        {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
        {item.paymentRecipient.userName}
      </div>
    </div>
  );
};

export default RenderGroupPayments;
