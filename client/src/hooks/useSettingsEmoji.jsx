// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Utils and Constants
import emojiConstants from "../constants/emojiConstants";
import useGetClientDeviceAndPwaInfo from "./useGetClientDeviceAndPwaInfo";

// Hooks

/**
 * Custom hook to handle the settings emoji based on the user's browser to handle related
 * Firefox & newly introduced Chrome bug. (settings emoji not rendered correctly, see: https://github.com/googlefonts/noto-emoji/issues/391)
 *
 */
const useSettingsEmoji = () => {
  const [settingsEmoji, setSettingsEmoji] = useState(null);
  const { browserName } = useGetClientDeviceAndPwaInfo();

  useEffect(() => {
    const lowerCaseBrowser = browserName.toLowerCase();
    const isFirefoxOrChrome =
      lowerCaseBrowser.includes("firefox") ||
      lowerCaseBrowser.includes("chrome");
    const emojiToUse = isFirefoxOrChrome
      ? emojiConstants.chromeAndFireFoxSettings
      : emojiConstants.settings;
    setSettingsEmoji(emojiToUse);
  }, [browserName]);

  return settingsEmoji;
};

export default useSettingsEmoji;
