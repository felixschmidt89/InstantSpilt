// React and Third-Party Libraries
import { useState, useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

/**
 * checks if the "Noto Emoji" font replacing client emojis is loaded.
 * @returns {boolean} True if loaded, otherwise false.
 */
const useIsNotoEmojiFontLoaded = () => {
  const [notoEmojiFontIsLoaded, setNotoEmojiFontIsLoaded] = useState(false);

  useEffect(() => {
    const font = new FontFaceObserver("Noto Emoji");

    font
      .load()
      .then(() => {
        setNotoEmojiFontIsLoaded(true);
        devLog("Noto Emoji Font loaded successfully");
      })
      .catch((error) => {
        devLog("Font could not be loaded:", error);
      });
  }, []);

  return notoEmojiFontIsLoaded;
};

export default useIsNotoEmojiFontLoaded;
