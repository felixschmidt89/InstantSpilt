// React and Third-Party Libraries
import React from "react";
import { IoLogoGithub } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io";
import { FaScaleBalanced } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";

// Constants and Utils
import { currentYear } from "../../../constants/dateConstants";

// Components
import ReactIconNavigate from "../ReactIconNavigate/ReactIconNavigate";

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
        tooltip={`${currentYear} - Felix Schmidt`}
        url={"https://www.linkedin.com/in/felixschmidt89"}
        fontSize={28}
        marginTop={"0.3rem"}
      />
      {/* Email*/}
      <ReactIconNavigate
        icon={MdAlternateEmail}
        tooltip={"email"}
        email={"felix.schmidt@protonmail.com"}
        marginTop={"0.3rem"}
      />
      {/* Github repository */}
      <ReactIconNavigate
        icon={IoLogoGithub}
        tooltip={"GitHub repository"}
        url={"https://github.com/felixschmidt89/InstantSpilt"}
        marginRight={"0.1rem"}
        marginTop={"0.2rem"}
      />
      {/* Terms and conditions*/}
      <ReactIconNavigate
        icon={FaFileLines}
        route={"/terms-and-conditions/"}
        tooltip={"Terms and Conditions"}
        fontSize={20}
        marginRight={"0.2rem"}
        marginTop={"0.4rem"}
      />
      {/* Legal notice*/}
      <ReactIconNavigate
        icon={FaScaleBalanced}
        route={"/legal-notice/"}
        tooltip={"Legal Notice"}
        fontSize={25}
        marginTop={"0rem"}
      />
    </footer>
  );
};

export default Footer;
