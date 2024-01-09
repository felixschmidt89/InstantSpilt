import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../../constants/emojiConstants";
import DeleteResourceText from "../../../common/DeleteResourceText/DeleteResourceText";
import styles from "./UserPaymentsHistory.module.css";

const UserPaymentsHistory = ({ item, onDelete, userId }) => {
  return (
    <div className={styles.payments}>
      <div className={styles.leftColumn}>
        <div className={styles.paymentEmoji}>{emojiConstants.payment}</div>
        <div className={styles.paymentAmount}>
          <p>{item.paymentAmount.toFixed(2)}€</p>
          <Link
            to={`/user-history-item-page?itemId=${item.itemId}&itemType=${item.itemType}&userId=${userId}`}>
            edit
          </Link>
          <DeleteResourceText
            resourceId={item.itemId}
            resourceType={`${item.itemType}s`}
            onDelete={onDelete}
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
        {item.paymentRecipient.userName}
      </div>
    </div>
  );
};

export default UserPaymentsHistory;
