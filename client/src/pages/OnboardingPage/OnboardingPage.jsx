import React from "react";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import emojiConstants from "../../constants/emojiConstants";
import styles from "./OnboardingPage.module.css";

function OnboardingPage() {
  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        alignment={"right"}
        buttonText={"got it!"}
      />
      <div className={styles.container}>
        <h1>Brief explanation</h1>
        <h2>Top Section</h2>
        <p>
          Contains features not directly related to settling expenses, such as
          inviting others or leaving the group.
        </p>
        <h2> Middle Section:</h2>
        <p>
          <ul>
            <li>
              <strong>Balances:</strong> Displays users' current balances; click
              a name for more details.
            </li>
            <li>
              <strong>History</strong>: Lists all expenses and payments; click
              an amount for details.
            </li>
          </ul>
        </p>
        <h2>
          <strong>Bottom Section:</strong>
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
    </main>
  );
}

export default OnboardingPage;
