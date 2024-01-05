import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UpdatePaymentUserPage.module.css";
import emojiConstants from "../../constants/emojiConstants";
import RenderPaymentUpdateForm from "../../components/features/UpdatePayment/UpdatePayment";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function UpdatePaymentUserPage() {
  const { userId, itemId } = useParams();
  const groupCode = localStorage.getItem("activeGroupCode");
  const [isLoading, setIsLoading] = useState(true);

  const paymentDetails = useFetchPaymentInfo(itemId);
  const groupMembers = useFetchGroupMembers(groupCode);

  // useEffect to handle isLoading
  useEffect(() => {
    // Check if both paymentDetails and groupMembers are available
    if (paymentDetails && groupMembers) {
      setIsLoading(false);
    }
  }, [paymentDetails, groupMembers]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Update payment' />
      <PiratePx COUNT_IDENTIFIER={"update-user-payment/:itemId"} />

      {/* Render a back button */}
      <NavigateButton
        route={`user-history/${userId}`}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h2 className={styles.header}>Update payment {emojiConstants.payment}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        // Render the form when isLoading is false
        <RenderPaymentUpdateForm
          groupMembers={groupMembers}
          groupCode={groupCode}
          paymentDetails={paymentDetails}
          expenseId={itemId}
          route={`/user-history/${userId}`}
        />
      )}
    </main>
  );
}
