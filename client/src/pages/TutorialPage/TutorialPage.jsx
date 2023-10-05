import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import {
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import emojiConstants from "../../constants/emojiConstants";
import styles from "./TutorialPage.module.css";
import CopyToClipboard from "../../components/reuseableComponents/CopyToClipboard/CopyToClipboard";

function TutorialPage() {
  const { groupName, groupCode } = useParams();

  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        alignment={"left"}
        buttonText={"back"}
      />
      <div className={styles.container}>
        <h1>Tutorial</h1>

        <h2>GroupCode</h2>
        <p>
          All you need to access this group is your <strong>Groupcode</strong>.
          So be sure to write it down in a safe place.
        </p>
        <CopyToClipboard infoToCopy={groupCode} />
        <p>
          Alternatively, bookmark the{" "}
          <Link to={`/share-group/${groupName}/${groupCode}`}>
            invitation link
          </Link>{" "}
          to avoid losing access to this group.
        </p>
        <section className={styles.instantSplit}>
          <h2>Instant Split - main functionalities</h2>
          <h3>Top Section</h3>
          <p>
            Contains features not directly related to settling expenses, such as
            inviting others (
            <FontAwesomeIcon icon={faUserPlus} />) or leaving the group (
            <FontAwesomeIcon icon={faRightFromBracket} />
            ).
          </p>
          <h3> Middle Section</h3>
          <p>
            <ul>
              <li>
                <strong>Balances:</strong> Displays users' current balances;
                click a name for more details.
              </li>
              <li>
                <strong>History</strong>: Lists all expenses and payments; click
                an amount for details.
              </li>
            </ul>
          </p>
          <h3>
            <strong>Bottom Section</strong>
          </h3>
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
        </section>
      </div>
    </main>
  );
}

export default TutorialPage;
