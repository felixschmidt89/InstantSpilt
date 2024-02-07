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
        iconScale={1.2}
        containerHeight='4'
        tooltip={`${currentYear} - Felix Schmidt`}
        url={"https://www.linkedin.com/in/felixschmidt89"}
        marginRight={0.5}
      />
      {/* Email*/}
      <ReactIconNavigate
        icon={MdAlternateEmail}
        tooltip={"email"}
        email={"felix.schmidt@protonmail.com"}
        iconScale={1.1}
        containerHeight='4'
        marginRight={0.5}
      />
      {/* Github repository */}
      <ReactIconNavigate
        icon={IoLogoGithub}
        tooltip={"GitHub repository"}
        containerHeight='4'
        url={"https://github.com/felixschmidt89/InstantSpilt"}
        marginRight={0.5}
      />
      {/* Terms and conditions*/}
      <ReactIconNavigate
        icon={FaFileLines}
        route={"/terms-and-conditions/"}
        tooltip={"Terms and Conditions"}
        iconScale={0.9}
        translateY={0.1}
        containerHeight='4'
        marginRight={0.5}
      />
      {/* Legal notice*/}
      <ReactIconNavigate
        icon={FaScaleBalanced}
        route={"/legal-notice/"}
        tooltip={"Legal Notice"}
        containerHeight='4'
      />
    </footer>
  );
};

export default Footer;
