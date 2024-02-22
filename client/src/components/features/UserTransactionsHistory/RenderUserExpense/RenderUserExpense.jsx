import React from "react";
import emojiConstants from "../../../../constants/emojiConstants";
import DeleteResource from "../../../common/DeleteResource/DeleteResource";
import Emoji from "../../../common/Emoji/Emoji";
import RenderDataAttributeWithAriaLabel from "../../../common/RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel";
import LinkToPage from "../../../common/InAppNavigation/LinkToPage/LinkToPage";
import styles from "./RenderUserExpense.module.css";

/**
 * Renders a user expense component.
 * @param {object} props - The props object.
 * @param {object} props.item - The expense item to be displayed.
 * @param {string} props.groupCode - The groupCode of the group to which the expense belongs.
 * @param {Function} props.onDeleteResource - function to handle the deletion of the expense item to trigger a refresh in parent component.
 * @param {string} props.groupCurrency - The currency used within the group.
 * @param {Array} props.groupMembers - Array of group members.
 * @returns {JSX.Element} React Component.
 */
const RenderUserExpense = ({
  item,
  groupCode,
  onDeleteResource,
  groupCurrency,
  groupMembers,
}) => {
  const allGroupMembersBenefitFromExpense =
    groupMembers.length === item.expenseBeneficiaries.length;

  const beneficiaries = allGroupMembersBenefitFromExpense
    ? "all group members"
    : item.expenseBeneficiaries
        .map((beneficiary) => beneficiary.userName)
        .join(", ");

  return (
    <div className={styles.expenses}>
      {/* Left Column */}
      <ul className={styles.leftColumn}>
        <li className={styles.amountLine}>
          <div className={styles.expenseEmoji}>
            <Emoji
              label={"expense emoji"}
              emoji={emojiConstants.expense}></Emoji>
          </div>
          <div className={styles.expenseAmount}>
            <div>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseAmount.toFixed(2)}
                ariaLabel={"expense amount"}
              />
              <span>{groupCurrency}</span>
            </div>
          </div>
        </li>

        <li className={styles.actionLine}>
          <LinkToPage
            to={`/update-expense/${groupCode}/${item._id}`}
            setNestedPreviousRoute={true}>
            edit
          </LinkToPage>
        </li>
        <li className={styles.actionLine}>
          <DeleteResource
            resourceId={item._id}
            resourceType={"expenses"}
            onDeleteResource={onDeleteResource}
            isButton={false}
            navigateOnDelete={false}
            showResourceType={false}
          />
        </li>
      </ul>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          <ul>
            <li>
              <span className={styles.key}>description: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expenseDescription}
                ariaLabel={"expense description"}
              />
            </li>
            <li>
              <span className={styles.key}>paid by: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={item.expensePayer.userName}
                ariaLabel={"username of the expense payer"}
              />
            </li>

            <li>
              <span className={styles.key}>beneficiaries: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={beneficiaries}
                ariaLabel={"expense beneficiaries"}
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

            <li>
              <span className={styles.key}>created: </span>
              <RenderDataAttributeWithAriaLabel
                attribute={new Date(item.createdAt).toLocaleString()}
                ariaLabel={"expense creation date"}
              />
            </li>

            {item.createdAt !== item.updatedAt && (
              <li>
                <span className={styles.key}>changed: </span>
                <RenderDataAttributeWithAriaLabel
                  attribute={new Date(item.updatedAt).toLocaleString()}
                  ariaLabel={"expense last update date"}
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderUserExpense;
