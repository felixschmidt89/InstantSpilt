// Constants and Utils
import { currentTimeStamp, twentyFourHours } from "../constants/dateConstants";
import { devLog } from "./errorUtils";

/**
 * Checks if the Web Share API is supported on the user's device.
 *
 * @returns {boolean} - Returns true if the Web Share API is supported, otherwise false.
 */
export const isWebShareAPISupported = () => {
  const isSupported = navigator.share !== undefined;
  devLog("User's device supports Web Share API:", isSupported);
  return isSupported;
};

/**
 * Checks if if the user has closed the PWA CTA modal more than 24 hours ago.
 * @returns {boolean} True if the user action has expired or can not be found, false otherwise.
 */
export const checkModalClosureUserActionExpiration = () => {
  const lastModalClosure = localStorage.getItem("pwaCtaClosed");
  if (lastModalClosure) {
    const lastModalClosureTimestamp = Number(lastModalClosure);
    const timeSinceLastClosure = currentTimeStamp - lastModalClosureTimestamp;
    return timeSinceLastClosure > twentyFourHours;
  }
  return true; // If no lastModalClosure found treat as expired
};
