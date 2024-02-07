// React and Third-Party Libraries
import React from "react";
import { IoLogoGithub } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io";
import { FaScaleBalanced } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";

// Constants and Utils
import { currentYear } from "../../../constants/dateConstants";
import ReactIconNavigate from "../InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Components

// Styles
import styles from "./Footer.module.css";

/**
 * footer component that displays and links essential information at the bottom of the page:
 * LinkedIn, email, GitHub repository, terms and conditions and legal notice.
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* LinkedIn profile */}
      <ReactIconNavigate
        icon={IoLogoLinkedin}
        iconScale={1.3}
        containerHeight='2'
        containerWidth='3'
        marginRight='0.5'
        tooltip={`${currentYear} - Felix Schmidt`}
        tooltipBottom={120}
        url={"https://www.linkedin.com/in/felixschmidt89"}
      />
      {/* Email*/}
      <ReactIconNavigate
        icon={MdAlternateEmail}
        tooltip={"email"}
        email={"felix.schmidt@protonmail.com"}
        iconScale={1.2}
        containerHeight='2'
        containerWidth='3'
        marginRight='0.5'
        tooltipBottom={120}
      />
      {/* Github repository */}
      <ReactIconNavigate
        icon={IoLogoGithub}
        tooltip={"GitHub repository"}
        iconScale={1.2}
        containerHeight='2'
        containerWidth='3'
        marginRight='0.5'
        url={"https://github.com/felixschmidt89/InstantSpilt"}
        tooltipBottom={120}
      />
      {/* Terms and conditions*/}
      <ReactIconNavigate
        icon={FaFileLines}
        route={"/terms-and-conditions/"}
        tooltip={"Terms and Conditions"}
        iconScale={1}
        translateY={0.1}
        containerHeight='2'
        containerWidth='3'
        marginRight='0.5'
        tooltipBottom={120}
      />
      {/* Legal notice*/}
      <ReactIconNavigate
        icon={FaScaleBalanced}
        route={"/legal-notice/"}
        tooltip={"Legal Notice"}
        containerHeight='2'
        containerWidth='2'
        tooltipBottom={120}
      />
    </footer>
  );
};

export default Footer;
