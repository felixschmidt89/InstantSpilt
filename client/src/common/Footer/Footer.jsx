import React from "react";
import NavigateFontAwesomeIcon from "../../components/NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";
import styles from "./Footer.module.css";
import LinkFontAwesomeIcon from "../../components/reuseableComponents/LinkFontAwesomeIcon/LinkFontAwesomeIcon";
import {
  faAt,
  faCopyright,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <LinkFontAwesomeIcon
        icon={faCopyright}
        url={"https://www.linkedin.com/in/felixschmidt89/"}
        tooltip={"2023 - Felix Schmidt"}
      />
      <LinkFontAwesomeIcon icon={faAt} email={"felix.schmidt@protonmail.com"} />
      <NavigateFontAwesomeIcon
        icon={faScaleBalanced}
        route={"/legal-notice/"}
        tooltip={"Legal Notice"}
      />
    </footer>
  );
}
