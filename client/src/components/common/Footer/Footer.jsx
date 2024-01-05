import React from "react";
import {
  faAt,
  faCopyright,
  faScaleBalanced,
  faCode,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import LinkFontAwesomeIcon from "../LinkFontAwesomeIcon/LinkFontAwesomeIcon";
import NavigateFontAwesomeIcon from "../NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";
import { currentYear } from "../../../constants/dateConstants";
import styles from "./Footer.module.css";

/**
 * footer component that displays and links essential information at the bottom of the page:
 * LinkedIn, email, GitHub repository, and legal notice.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <LinkFontAwesomeIcon
        icon={faCopyright}
        url={"https://www.linkedin.com/in/felixschmidt89/"}
        tooltip={`${currentYear} - Felix Schmidt`}
      />
      <LinkFontAwesomeIcon
        icon={faAt}
        email={"felix.schmidt@protonmail.com"}
        tooltip={"Mail"}
      />
      <LinkFontAwesomeIcon
        icon={faCode}
        url={"https://github.com/felixschmidt89/InstantSpilt"}
        tooltip={"GitHub repository"}
      />
      <NavigateFontAwesomeIcon
        icon={faFileLines}
        route={"/terms-and-conditions/"}
        tooltip={"Terms and Conditions"}
      />
      <NavigateFontAwesomeIcon
        icon={faScaleBalanced}
        route={"/legal-notice/"}
        tooltip={"Legal Notice"}
      />
    </footer>
  );
}
