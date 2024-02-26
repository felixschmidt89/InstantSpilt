// React and Third-Party Libraries
import { useEffect, useRef } from "react";
import { WidgetInstance } from "friendly-challenge";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../utils/errorUtils";

// Styles
import styles from "./FriendlyCaptcha.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Friendly Captcha widget (automatic and privacy respecting captcha mechanism). Should only be applied outside of the main application, ie when there is no active group in local storage, to prevent malicious attacks and must always be used directly in form elements
 *  Documentation: [Friendly Captcha Documentation](https://docs.friendlycaptcha.com/#/)
 * @param {string} props.sitekey - The sitekey provided by Friendly Captcha.
 *  @param {string} props.secret - The API key provided by Friendly Captcha.

 * @returns {JSX.Element} React component.
 */
const FriendlyCaptcha = ({ sitekey, secret }) => {
  devLog("Friendly captcha sitekey", sitekey);
  const container = useRef();
  const widget = useRef();

  const doneCallback = async (solution) => {
    devLog("Captcha was solved. The form can be submitted.");
    devLog("Solution:", solution);
    try {
      const response = await axios.post(`${apiUrl}/captchas/verify-captcha`, {
        solution,
        secret,
      });
      console.log("CaptchaVerified:", response);
      // Handle the response if needed
    } catch (error) {
      console.error("Error verifying captcha:", error);
      // Handle errors
    }
  };

  const errorCallback = (err) => {
    devLog("There was an error when trying to solve the Captcha.");
    devLog("Error:", err);
  };

  useEffect(() => {
    if (!widget.current && container.current) {
      widget.current = new WidgetInstance(container.current, {
        startMode: "auto",
        doneCallback: doneCallback,
        errorCallback: errorCallback,
      });
    }

    return () => {
      if (widget.current !== undefined) widget.current.reset();
    };
  }, [container]);

  return (
    <div
      ref={container}
      className={`${styles.container} frc-captcha`}
      data-sitekey={sitekey}
    />
  );
};

export default FriendlyCaptcha;
