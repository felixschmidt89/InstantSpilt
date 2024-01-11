// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import DeleteResource from "../../../common/DeleteResource/DeleteResource";
import Emoji from "../../../common/Emoji/Emoji";
import RenderDataAttributeWithAriaLabel from "../../../common/RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel";

// Styles
import styles from "./RenderUserPayment.module.css";

/**
 * Component for rendering details of a user's single payment.
 * @param {Object} props - The component props.
 * @param {Object} props.item - The payment item object.
 * @param {string} props.userId - The ID of the user.
 * @param {Function} props.onDelete - Callback function for deleting the payment.
 * @returns {JSX.Element} - RenderUserPayment component.
 */
const RenderUserPayment = ({ item, userId, onDelete }) => {
  console.log("item", item);
  return (
    <div className={styles.payments}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <div className={styles.paymentEmoji}>
          <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
        </div>
        <div className={styles.paymentAmount}>
          <div>
            <RenderDataAttributeWithAriaLabel
              attribute={item.paymentAmount.toFixed(2)}
              ariaLabel={"payment amount"}
            />
            <span>€</span>
          </div>
          {/* Link to edit expense details */}
          <Link
            to={`/user-history-item-page?itemId=${item.itemId}&itemType=${item.itemType}&userId=${userId}`}>
            edit
          </Link>
          <DeleteResource
            resourceId={item.itemId}
            resourceType={`${item.itemType}s`}
            onDelete={onDelete}
            isButton={false}
          />
        </div>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <RenderDataAttributeWithAriaLabel
          attribute={item.paymentMaker.userName}
          ariaLabel={"username of the payment maker"}
        />
        <Emoji
          label={"payment made to emoji"}
          emoji={emojiConstants.paymentsMade}></Emoji>
        <RenderDataAttributeWithAriaLabel
          attribute={item.paymentRecipient.userName}
          ariaLabel={"username of the payment recipient"}
        />
      </div>
    </div>
  );
};

export default RenderUserPayment;
