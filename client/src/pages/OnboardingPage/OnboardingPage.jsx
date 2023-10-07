import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import emojiConstants from "../../constants/emojiConstants";
import styles from "./OnboardingPage.module.css";
import UserActionsContainer from "../../components/containerComponents/UserActionsComponent/UserActionsComponent";
import SplitExpensesActionsComponent from "../../components/containerComponents/SplitExpensesActionsComponent/SplitExpensesActionsComponent";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";

function OnboardingPage() {
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Onboarding' />

      <NavigateButton
        route={"instant-split"}
        alignment={"right"}
        buttonText={"got it!"}
      />
      <div className={styles.container}>
        <div className={styles.overlay}>
          <h1>Brief explanation</h1>
          <h2>Top section</h2>
          <UserActionsContainer />
          <p>
            Contains features not directly related to settling expenses, such as
            inviting others{" "}
            <span>
              (
              <FontAwesomeIcon icon={faUserPlus} />)
            </span>{" "}
            or leaving the group{" "}
            <span>
              (
              <FontAwesomeIcon icon={faRightFromBracket} />)
            </span>
            .
          </p>
          <h2> Middle section:</h2>
          <p>
            <ul>
              <li>
                <button className={styles.button}>Balances</button>
                <div>
                  Displays users' current balances; click a name for more
                  details.
                </div>
              </li>
              <li>
                <button className={styles.button}>History</button>
                <div>
                  Lists all expenses and payments; click an amount for details.
                </div>
              </li>
            </ul>
          </p>
          <h2>
            <strong>Bottom section</strong>
            <SplitExpensesActionsComponent />
          </h2>
          <p>
            Allows you to perform actions:
            <ul>
              <li>
                add expenses ({emojiConstants.expense}), payments(
                {emojiConstants.payment}) and users ({emojiConstants.user})
              </li>
              <li>View settlement suggestions({emojiConstants.settle})</li>
            </ul>
          </p>
        </div>
      </div>
    </main>
  );
}

export default OnboardingPage;
