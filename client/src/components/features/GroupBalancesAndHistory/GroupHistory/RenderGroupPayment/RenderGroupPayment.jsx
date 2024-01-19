// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../../../../constants/emojiConstants";
import Emoji from "../../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderGroupPayment.module.css";

/**
 * Component for rendering a single group payment.
 *
 * @param {Object} props - The component properties.
 * @param {Object} props.item - The payment item to be rendered.
 * @returns {JSX.Element} React component. */
const RenderGroupPayment = ({ item, groupCode }) => {
  return (
    <div className={styles.payments}>
      {/* Left column with payment emoji and amount */}
      <div className={styles.leftColumn}>
        <div className={styles.paymentEmoji}>
          <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
        </div>
        <div className={styles.paymentAmount}>
          {/* Link to the item page with item details */}
          <Link to={`/payment-details/${groupCode}/${item.itemId}`}>
            {item.paymentAmount.toFixed(2)}€
          </Link>
        </div>
      </div>
      {/* Right column with payment maker, emoji, and payment recipient */}
      <div className={styles.rightColumn}>
        {item.paymentMaker.userName}{" "}
        <Emoji
          label={"payment to other user emoji"}
          emoji={emojiConstants.paymentsMade}></Emoji>{" "}
        {item.paymentRecipient.userName}
      </div>
    </div>
  );
};

export default RenderGroupPayment;