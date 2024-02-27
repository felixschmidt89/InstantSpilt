// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../../../../constants/emojiConstants";

// Components
import Emoji from "../../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderGroupExpense.module.css";
import { devLog } from "../../../../../utils/errorUtils";

/**
 * Component for rendering a single group expense.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.item - The expense item to render.
 *  @param {string} props.groupCode - The groupCode of the group.
 *  @param {string} props.groupCurrency - The currency of the group.
 *  @param {Array} props.groupMembers - array of group member names.
 * @returns {JSX.Element} React component. */
const RenderGroupExpense = ({
  item,
  groupCode,
  groupCurrency,
  groupMembers,
}) => {
  devLog(item);

  const allGroupMembersBenefitFromExpense =
    item.expenseBeneficiaries.length === groupMembers.length;

  return (
    <div className={styles.expenses}>
      {/* Left column containing expense emoji and amount */}
      <div className={styles.leftColumn}>
        <Emoji
          label={"expense emoji"}
          emoji={emojiConstants.expense}
          scale={"1.1"}
          translateX={"0.15"}
          translateY={"0.1"}
        />
        <div className={styles.expenseAmount}>
          <Link to={`/expense-details/${groupCode}/${item.itemId}`}>
            {item.expenseAmount.toFixed(2)}
            {groupCurrency}
          </Link>
        </div>
      </div>
      {/* Right column containing expense details */}
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          {item.expensePayer.userName}
          {allGroupMembersBenefitFromExpense && (
            <span className={styles.forAll}> for all</span>
          )}
          : {/* Link to the detailed item page */}
          <Link to={`/expense-details/${groupCode}/${item.itemId}`}>
            {item.expenseDescription}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenderGroupExpense;
