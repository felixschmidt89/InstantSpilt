// React and Third-Party Libraries
import React from "react";

// Constants and Utils
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import DeleteResource from "../../../common/DeleteResource/DeleteResource";
import Emoji from "../../../common/Emoji/Emoji";
import RenderDataAttributeWithAriaLabel from "../../../common/RenderDataAttributeWithAriaLabel/RenderDataAttributeWithAriaLabel";
import LinkToPage from "../../../common/InAppNavigation/LinkToPage/LinkToPage";

// Styles
import styles from "./RenderUserPayment.module.css";

/**
 * Component for rendering details of a user's single payment.
 * @param {Object} props - The component props.
 * @param {Object} props.item - The payment item object.
 * @param {string} props.groupCode - The associated groupCode.
 * @param {Function} props.onDelete - Callback function for deleting the payment.
 * @returns {JSX.Element} React component. */
const RenderUserPayment = ({
  item,
  groupCode,
  onDeleteResource,
  groupCurrency,
}) => {
  return (
    <div className={styles.payments}>
      {/* Left Column */}
      <div className={styles.leftColumn}>
        <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
        <div className={styles.paymentAmount}>
          <div>
            <RenderDataAttributeWithAriaLabel
              attribute={item.paymentAmount.toFixed(2)}
              ariaLabel={"payment amount"}
            />
            <span>{groupCurrency}</span>
          </div>
          <LinkToPage
            to={`/update-payment/${groupCode}/${item._id}`}
            setNestedPreviousRoute={true}>
            edit
          </LinkToPage>
          <DeleteResource
            resourceId={item._id}
            resourceType={"payments"}
            onDeleteResource={onDeleteResource}
            isButton={false}
            navigateOnDelete={false}
            showResourceType={false}
          />
        </div>
      </div>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <RenderDataAttributeWithAriaLabel
          attribute={item.paymentMaker.userName}
          ariaLabel={"username of the payment maker"}
        />
        <Emoji
          label={"payment to other user emoji"}
          emoji={emojiConstants.paymentsMade}
          shrinkOnSmallDevices={true}
        />

        <RenderDataAttributeWithAriaLabel
          attribute={item.paymentRecipient.userName}
          ariaLabel={"username of the payment recipient"}
        />
      </div>
    </div>
  );
};

export default RenderUserPayment;
