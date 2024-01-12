import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import CreateExpense from "../../components/features/Expenses/CreateExpense/CreateExpense";
import styles from "./CreateExpensePage.module.css";
import CreateUserCTA from "../../components/common/CreateUserCTA/CreateUserCTA";
import InAppNavigationBar from "../../components/common/InAppNavigationBar/InAppNavigationBar";

const CreateExpensePage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-expense"} />
      <InAppNavigationBar back={true} backRoute='/instant-split' />
      <h2 className={styles.header}>Add expense {emojiConstants.expense}</h2>
      {!isFetched ? (
        <Spinner />
      ) : // Check if there are at least 2 group members
      groupMembers.length <= 1 ? (
        <CreateUserCTA isPayment={false} />
      ) : (
        <CreateExpense groupMembers={groupMembers} groupCode={groupCode} />
      )}
    </main>
  );
};

export default CreateExpensePage;
