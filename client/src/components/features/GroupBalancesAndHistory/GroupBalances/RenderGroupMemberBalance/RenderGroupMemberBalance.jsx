// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import { BALANCE_THRESHOLD } from "../../../../../constants/dataConstants";
import emojiConstants from "../../../../../constants/emojiConstants";

// Components
import Emoji from "../../../../common/Emoji/Emoji";

// Styles
import styles from "./RenderGroupMemberBalance.module.css";

/**
 * Component for rendering group member name and balance
 *
 * @param {Object[]} userDetails - The array of user details.
 *  @param {string} props.groupCode - The groupCode of the group.
 *  @param {string} props.groupCurrency - The currency of the group.
 * @returns {JSX.Element} React component. */
const RenderGroupMemberBalance = ({
  groupMemberDetails,
  groupCode,
  groupCurrency,
}) => (
  <div className={styles.balancesContainer}>
    <ul>
      {groupMemberDetails.map((user) => (
        <Link
          key={user.userId}
          to={`/groupmember-details/${groupCode}/${user.userId}`}
          className={styles.groupMemberListItemLink}>
          <li className={styles.groupMemberListItem}>
            <div className={styles.groupMemberDetails}>
              <div className={styles.leftColumn}>
                <span className={styles.emoji}>
                  <Emoji
                    label={"expense emoji"}
                    emoji={emojiConstants.member}
                  />
                </span>
                <span className={styles.groupMemberName}>{user.userName}</span>
              </div>
              <div className={styles.rightColumn}>
                {/* Visually indicate negative userBalance*/}
                <div
                  className={`${styles.userBalance} ${
                    user.userBalance >= 0
                      ? styles.positiveBalance
                      : styles.negativeBalance
                  }`}>
                  {/* Fix remaining rounding issue in certain situations, e.g., 100€/3 will result in 33.33, 33.33, 33.4 */}
                  {user.userBalance === BALANCE_THRESHOLD ||
                  user.userBalance === -BALANCE_THRESHOLD
                    ? `0.00${groupCurrency}`
                    : user.userBalance.toFixed(2) + `${groupCurrency}`}
                </div>
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  </div>
);

export default RenderGroupMemberBalance;
