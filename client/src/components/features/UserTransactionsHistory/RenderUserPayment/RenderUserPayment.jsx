// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <div className={styles.payments}>
      {/* Left Column */}
      <ul className={styles.leftColumn}>
        <li className={styles.amountLine}>
          <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
          <div className={styles.paymentAmount}>
            <div>
              <RenderDataAttributeWithAriaLabel
                attribute={item.paymentAmount.toFixed(2)}
                ariaLabel={"payment amount"}
              />
              <span>{groupCurrency}</span>
            </div>
          </div>
        </li>
        <li className={styles.actionLine}>
          <LinkToPage
            to={`/update-payment/${groupCode}/${item._id}`}
            setNestedPreviousRoute={true}>
            {t("user-transaction-history-edit-link")}
          </LinkToPage>
        </li>
        <li className={styles.actionLine}>
          <DeleteResource
            resourceId={item._id}
            resourceType={"payments"}
            onDeleteResource={onDeleteResource}
            isButton={false}
            navigateOnDelete={false}
            showResourceType={false}
          />
        </li>
      </ul>
      {/* Right Column */}
      <div className={styles.rightColumn}>
        <ul>
          <li>
            <span className={styles.key}>
              {t("user-transaction-history-paid-by-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.paymentMaker.userName}
              ariaLabel={"username of the payment maker"}
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("user-transaction-history-paid-to-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={item.paymentRecipient.userName}
              ariaLabel={"username of the payment recipient"}
            />
          </li>
          <li>
            <span className={styles.key}>
              {t("user-transaction-history-created-key")}:{" "}
            </span>
            <RenderDataAttributeWithAriaLabel
              attribute={new Date(item.createdAt).toLocaleString()}
              ariaLabel={"payment creation date"}
            />
          </li>
          {item.createdAt !== item.updatedAt && (
            <li>
              <span className={styles.key}>
                {t("user-transaction-history-changed-key")}:{" "}
              </span>
              <RenderDataAttributeWithAriaLabel
                attribute={new Date(item.updatedAt).toLocaleString()}
                ariaLabel={"payment last update date"}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RenderUserPayment;
