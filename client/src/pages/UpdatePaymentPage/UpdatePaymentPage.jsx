import React, { useEffect, useState } from "react";
import styles from "./UpdatePaymentPage.module.css";
import emojiConstants from "../../constants/emojiConstants";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import RenderPaymentUpdateForm from "../../components/containerComponents/RenderPaymentUpdateForm/RenderPaymentUpdateForm";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";

export default function UpdatePaymentPage() {
  const { itemId } = useParams();
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

  console.log(paymentDetails, groupMembers);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Update payment' />
      {/* Render a back button */}
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
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
        />
      )}
    </main>
  );
}
