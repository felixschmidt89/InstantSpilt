import { useEffect, useState } from "react";
import { devLog } from "../utils/errorUtils";

export default function useUserAgent() {
  const [isMobile, setIsMobile] = useState(null);
  const [userAgent, setUserAgent] = useState(null);
  const [isIOS, setIsIOS] = useState(null);
  const [isStandalone, setIsStandalone] = useState(null);
  const [userAgentString, setUserAgentString] = useState(null);

  useEffect(() => {
    if (window) {
      const userAgentString = window.navigator.userAgent;
      setUserAgentString(userAgentString);
      let userAgent;

      /**
       * Parse user agent string to determine browser
       * The order of the if statements is important because some browsers
       * have multiple matches in their user agent string
       */
      if (userAgentString.indexOf("SamsungBrowser") > -1) {
        userAgent = "SamsungBrowser";
      } else if (userAgentString.indexOf("Chrome") > -1) {
        devLog("Chrome is used. Do not render CTA to install PWA");
      } else if (userAgentString.indexOf("Firefox") > -1) {
        userAgent = "Firefox";
      } else if (userAgentString.indexOf("Safari") > -1) {
        userAgent = "Safari";
      } else {
        userAgent = "unknown";
      }
      setUserAgent(userAgent);

      setIsIOS(userAgentString.match(/iPhone|iPad|Macintosh/i));

      const isMobile = () => {
        const isTouchScreen = window.matchMedia("(any-pointer:coarse)").matches;
        const isMouseScreen = window.matchMedia("(any-pointer:fine)").matches;

        return isTouchScreen && !isMouseScreen;
      };
      setIsIOS(isIOS ? true : false);
      setIsMobile(!!isMobile);

      // Check if app is currently used in standalone mode
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsStandalone(true);
      }
    }
  }, []);

  return { isMobile, userAgent, isIOS, isStandalone, userAgentString };
}
