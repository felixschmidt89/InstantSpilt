import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ExplainMainFunctionalities.module.css";
import SplitExpensesActionsComponent from "../SplitExpensesActionsComponent/SplitExpensesActionsComponent";
import UserActionsContainer from "../UserActionsComponent/UserActionsComponent";
import emojiConstants from "../../../constants/emojiConstants";

const ExplainMainFunctionalities = () => {
  return (
    <div className={styles.container}>
      <h2>Top section</h2>
      <div className={styles.noLink}>
        <UserActionsContainer />
      </div>
      <p className={styles.noWrap}>
        Contains features not directly related to settling expenses, such as
        inviting others{" "}
        <span className={styles.icons}>
          (<FontAwesomeIcon icon={faUserPlus} />)
        </span>{" "}
        or leaving the group{" "}
        <span className={styles.icons}>
          (<FontAwesomeIcon icon={faRightFromBracket} />)
        </span>
        .
      </p>
      <h2>Middle section:</h2>
      <ul className={styles.noLink}>
        <li>
          <button className={styles.button}>Balances</button>
          <div>
            Displays users' current balances; click a name for more user
            details.
          </div>
        </li>
        <li>
          <button className={styles.button}>History</button>
          <div>
            Lists all expenses and payments; click an amount to view
            transactional details or make changes.
          </div>
        </li>
      </ul>
      <h2>
        <strong>Bottom section</strong>
        <div className={styles.noLink}>
          {" "}
          <SplitExpensesActionsComponent />
        </div>
      </h2>
      <p className={styles.noLink}>
        Perform split actions:
        <ul>
          <li>
            Add expenses{" "}
            <span className={styles.emojiParenthesis}>
              ({emojiConstants.expense})
            </span>
            , payments{" "}
            <span className={styles.emojiParenthesis}>
              ({emojiConstants.payment})
            </span>{" "}
            and users
            <span className={styles.emojiParenthesis}>
              ({emojiConstants.user})
            </span>
            .
          </li>
          <li>
            Show unsettled balances and payment suggestions{" "}
            <span className={styles.emojiParenthesis}>
              ({emojiConstants.settle}).
            </span>
          </li>
        </ul>
      </p>
    </div>
  );
};

export default ExplainMainFunctionalities;