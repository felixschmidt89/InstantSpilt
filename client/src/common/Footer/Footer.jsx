// DONE adding only meaningful necessary comments

import React from "react";
import styles from "./Footer.module.css";
import LinkFontAwesomeIcon from "../../components/reuseableComponents/LinkFontAwesomeIcon/LinkFontAwesomeIcon";
import {
  faAt,
  faCopyright,
  faScaleBalanced,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import NavigateFontAwesomeIcon from "../../components/reuseableComponents/NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";

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
        tooltip={"2023 - Felix Schmidt"}
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
        icon={faScaleBalanced}
        route={"/legal-notice/"}
        tooltip={"Legal Notice"}
      />
    </footer>
  );
}
