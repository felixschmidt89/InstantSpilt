// React and Third Party Libraries
import { useState, useEffect } from "react";
import { useDeviceSelectors } from "react-device-detect";

/**
 * Hook utilizing react-device-detect to get relevant info about client device and PWA status.
 * @returns {{
 *  isPwa: boolean,
 *  isMobile: boolean,
 *  isMobileSafari: boolean,
 *  isIOS: boolean,
 *  browserName: string
 * }} - client device information.
 */
const useGetClientDeviceAndPwaInfo = () => {
  const [isPwa, setIsInstantSplitPwa] = useState(false);
  const [selectors] = useDeviceSelectors(window.navigator.userAgent);

  // Check if app is running as PWA
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    setIsInstantSplitPwa(mediaQueryList.matches);
  }, []);

  const { isMobile, isAndroid, isMobileSafari, isIOS, browserName } = selectors;

  return {
    isPwa,
    isAndroid,
    isMobile,
    isMobileSafari,
    isIOS,
    browserName,
  };
};

export default useGetClientDeviceAndPwaInfo;
