// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  devLog(item);

  const allGroupMembersBenefitFromExpense =
    item.expenseBeneficiaries.length === groupMembers.length;

  return (
    <Link
      to={`/expense-details/${groupCode}/${item.itemId}`}
      className={styles.expenseLink}>
      <div className={styles.expense}>
        <div className={styles.leftColumn}>
          <Emoji
            ariaLabel={"expense emoji"}
            emoji={emojiConstants.expense}
            scale={"1.1"}
            translateX={"0.15"}
            translateY={"0.1"}
          />
          <div className={styles.expenseAmount}>
            {item.expenseAmount.toFixed(2)}
            {groupCurrency}
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.borderedContent}>
            {item.expensePayer.userName}
            {allGroupMembersBenefitFromExpense && (
              <span className={styles.forAll}>
                {t("render-group-expense-for-all-badge")}
              </span>
            )}
            : {item.expenseDescription}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RenderGroupExpense;
