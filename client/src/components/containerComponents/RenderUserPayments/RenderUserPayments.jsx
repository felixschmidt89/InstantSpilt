import React from "react";
import { Link } from "react-router-dom";
import emojiConstants from "../../../constants/emojiConstants";
import DeleteResourceText from "../../reuseableComponents/DeleteResourceText/DeleteResourceText";
import styles from "./RenderUserPayments.module.css";
import { useParams } from "react-router-dom";

export default function RenderUserPayments({ item }) {
  const { userId } = useParams();
  return (
    <div className={styles.payments}>
      <div className={styles.leftColumn}>
        <div className={styles.paymentEmoji}>{emojiConstants.payment}</div>
        <div className={styles.paymentAmount}>
          <p>{item.paymentAmount.toFixed(2)}€</p>
          <Link
            to={`/user-history-item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
            edit
          </Link>
          <DeleteResourceText
            resourceId={item.itemId}
            resourceType={`${item.itemType}s`}
            route={`/user-history/${userId}`}
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
        {item.paymentRecipient.userName}
      </div>
    </div>
  );
}
