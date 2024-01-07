import { Link } from "react-router-dom";
import emojiConstants from "../../../constants/emojiConstants";
import DeleteResourceText from "../../common/DeleteResourceText/DeleteResourceText";
import styles from "./RenderUserExpenses.module.css";

const RenderUserExpenses = ({ item, handleRerender, userId }) => {
  return (
    <div className={styles.expenses}>
      <div className={styles.leftColumn}>
        <div className={styles.expenseEmoji}>{emojiConstants.expense}</div>
        <div className={styles.expenseAmount}>
          <p>{item.expenseAmount.toFixed(2)}€</p>
          <Link
            to={`/user-history-item-page?itemId=${item.itemId}&itemType=${item.itemType}&userId=${userId}`}>
            edit
          </Link>
          <DeleteResourceText
            resourceId={item.itemId}
            resourceType={`${item.itemType}s`}
            handleRerender={handleRerender}
          />
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.borderedContent}>
          <ul>
            <li>paid by: {item.expensePayer.userName}</li>
            <li>description: {item.expenseDescription}</li>
            <li>
              beneficiaries:{" "}
              {item.expenseBeneficiaries
                .map((beneficiary) => beneficiary.userName)
                .join(", ")}
            </li>
            <li>
              amount benefitted: {item.expenseAmountPerBeneficiary.toFixed(2)}€
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RenderUserExpenses;
