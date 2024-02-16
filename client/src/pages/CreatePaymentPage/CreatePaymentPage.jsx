// React and Third-Party Libraries
import React from "react";

// Hooks
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import CreatePayment from "../../components/features/Payments/CreatePayment/CreatePayment";
import CreateUserCTA from "../../components/features/GroupBalancesAndHistory/CreateUserCTA/CreateUserCTA";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./CreatePaymentPage.module.css";

const CreatePaymentPage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-payment"} />
      <InAppNavigationBar back={true} />
      <div className={styles.container}>
        <h1>new payment </h1>
        {!isFetched ? (
          <Spinner />
        ) : // Check if there are at least 2 group members
        groupMembers.length <= 1 ? (
          <CreateUserCTA />
        ) : (
          <CreatePayment groupMembers={groupMembers} groupCode={groupCode} />
        )}
      </div>
    </main>
  );
};

export default CreatePaymentPage;
