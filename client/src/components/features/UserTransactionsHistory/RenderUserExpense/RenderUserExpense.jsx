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
import styles from "./RenderUserExpense.module.css";

/**
 * Component for rendering details of a user's single expense.
 * @param {Object} props - The component props.
 * @param {Object} props.item - The expense item object.
 * @param {string} props.userId - The ID of the user.
 * @param {Function} props.onDelete - Callback function for deleting the expense.
 * @returns {JSX.Element} - RenderUserExpense component.
 */
const RenderUserExpense = ({ item, userId, onDelete }) => {
  const beneficiaryNames = item.expenseBeneficiaries
    .map((beneficiary) => beneficiary.userName)
    .join(", ");

  return (
    <div className={styles.expenses}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>
          <Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>
        </div>
        <div className={styles.expenseAmount}>
          <div>
            <RenderDataAttributeWithAriaLabel
              attribute={item.expenseAmount.toFixed(2)}
              ariaLabel={"expense amount"}
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
            resourceType={item.itemType}
            onDelete={onDelete}
            isButton={false}
          />
        </div>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          <ul>
            <li>
              <span className={styles.key}>Paid by: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expensePayer.userName}
                ariaLabel={"username of the expense payer"}
              />
            </li>
            <li>
              <span className={styles.key}>Description: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseDescription}
                ariaLabel={"expense description"}
              />
            </li>
            <li>
              <span className={styles.key}>Beneficiaries: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={beneficiaryNames}
                ariaLabel={"beneficiary usernames"}
              />
            </li>
            <li>
              <span className={styles.key}>Amount benefitted: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseAmountPerBeneficiary.toFixed(2)}
                ariaLabel={"amount each beneficiary has benefitted"}
              />
              <span>€</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderUserExpense;
