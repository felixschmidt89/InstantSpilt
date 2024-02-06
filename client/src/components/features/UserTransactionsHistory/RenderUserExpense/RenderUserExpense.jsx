// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import DeleteResource from "../../../common/DeleteResource/DeleteResource";
import Emoji from "../../../common/Emoji/Emoji";
import RenderDataAttributeWithAriaLabel from "../../../common/RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel";
import LinkToPage from "../../../common/InAppNavigation/LinkToPage/LinkToPage";

// Styles
import styles from "./RenderUserExpense.module.css";

/**
 * Component for rendering details of a user's single expense.
 * @param {Object} props - The component props.
 * @param {Object} props.item - The expense item object.
 * @param {string} props.groupCode - The associated groupCode.
 * @param {Function} props.onDelete - Callback function for deleting the expense.
 * @returns {JSX.Element} React component. */
const RenderUserExpense = ({
  item,
  groupCode,
  onDeleteResource,
  groupCurrency,
}) => {
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
            <span>{groupCurrency}</span>
          </div>
          <LinkToPage
            to={`/update-expense/${groupCode}/${item._id}`}
            setNestedPreviousRoute={true}>
            edit
          </LinkToPage>
          <DeleteResource
            resourceId={item._id}
            resourceType={"expenses"}
            onDeleteResource={onDeleteResource}
            isButton={false}
            navigateOnDelete={false}
            showResourceType={false}
          />
        </div>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          <ul>
            <li>
              <span className={styles.key}>paid by: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expensePayer.userName}
                ariaLabel={"username of the expense payer"}
              />
            </li>
            <li>
              <span className={styles.key}>description: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseDescription}
                ariaLabel={"expense description"}
              />
            </li>
            <li>
              <span className={styles.key}>beneficiaries: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={beneficiaryNames}
                ariaLabel={"beneficiary usernames"}
              />
            </li>
            <li>
              <span className={styles.key}>amount benefitted: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseAmountPerBeneficiary.toFixed(2)}
                ariaLabel={"amount each beneficiary has benefitted"}
              />
              <span>{groupCurrency}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderUserExpense;
