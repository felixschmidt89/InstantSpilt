// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Constants and Utils
import emojiConstants from "../../../constants/emojiConstants";

// Hooks
import useSettingsEmoji from "../../../hooks/useSettingsEmoji";
import useIsSlimDevice from "../../../hooks/useIsSlimDevice";
import useIsNotoEmojiFontLoaded from "../../../hooks/useIsNotoEmojiFontLoaded";

// Component
import GroupActionsEmojiButton from "../../common/GroupActionsEmojiButton/GroupActionsEmojiButton";

// Styles
import styles from "./ActiveGroupBar.module.css";

type ActiveGroupBarProps = {
  applyBottomMargin?: boolean;
};

/**
 * Toolbar displaying a set of navigation icons for creating expenses, payments & group members, for settling expenses within a group and for navigating to group settings.
 */
const ActiveGroupBar = ({ applyBottomMargin = true }: ActiveGroupBarProps) => {
  // Handle Firefox bug (settings emoji not rendered correctly https://github.com/googlefonts/noto-emoji/issues/391)
  const settingsEmoji = useSettingsEmoji();
  const { t } = useTranslation();
  const isSlimDevice = useIsSlimDevice();
  const notoEmojiFontIsLoaded = useIsNotoEmojiFontLoaded();

  // Render the group actions bar if emoji font is loaded
  return notoEmojiFontIsLoaded ? (
    <div
      className={`${styles.groupActionsBar} ${applyBottomMargin ? styles.bottomMargin : ""}`}
      role='toolbar'
      aria-label='active group bar'>
      {/* Button for navigating to group settings */}
      <GroupActionsEmojiButton
        route={"group-settings"}
        emoji={settingsEmoji || ""}
        translateX={0}
        explanationText={
          isSlimDevice
            ? t("active-group-bar-settings-emoji-short-copy")
            : t("active-group-bar-settings-emoji-copy")
        }
        ariaLabel='group settings emoji'
      />
      {/* Button for navigating to settling expenses */}
      <GroupActionsEmojiButton
        route={"settle-expenses"}
        emoji={emojiConstants.settle}
        explanationText={t("active-group-bar-settle-emoji-copy")}
        ariaLabel='settle expenses emoji'
        translateY={-0.1}
        scale={1.1}
      />
      {/* Button for navigating to adding users */}
      <GroupActionsEmojiButton
        route={"create-group-members"}
        emoji={emojiConstants.member}
        explanationText={t("active-group-bar-member-emoji-copy")}
        ariaLabel='add group member emoji'
        scale={0.97}
        translateY={-0.05}
      />
      {/* Button for navigating to adding payments */}
      <GroupActionsEmojiButton
        route={"create-payment"}
        emoji={emojiConstants.payment}
        explanationText={t("active-group-bar-payment-emoji-copy")}
        ariaLabel='add payment emoji'
      />
      {/* Button for navigating to adding expenses */}
      <GroupActionsEmojiButton
        route={"create-expense"}
        emoji={emojiConstants.expense}
        translateX={0.8}
        explanationText={t("active-group-bar-expense-emoji-copy")}
        ariaLabel='add expense emoji'
      />
    </div>
  ) : null;
};

export default ActiveGroupBar;