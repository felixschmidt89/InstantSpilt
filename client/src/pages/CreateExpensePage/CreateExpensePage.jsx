// React and Third-Party Libraries
import React from "react";

// Hooks
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import CreateExpense from "../../components/features/Expenses/CreateExpense/CreateExpense";
import CreateUserCTA from "../../components/common/CreateUserCTA/CreateUserCTA";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import Emoji from "../../components/common/Emoji/Emoji";

// Styles
import styles from "./CreateExpensePage.module.css";

const CreateExpensePage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-expense"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>
          Add expense{" "}
          <Emoji label={"expense emoji"} emoji={emojiConstants.expense}></Emoji>
        </h1>
        {!isFetched ? (
          <Spinner />
        ) : // Check if there are at least 2 group members
        groupMembers.length <= 1 ? (
          <CreateUserCTA isPayment={false} />
        ) : (
          <CreateExpense groupMembers={groupMembers} groupCode={groupCode} />
        )}
      </div>
    </main>
  );
};

export default CreateExpensePage;
