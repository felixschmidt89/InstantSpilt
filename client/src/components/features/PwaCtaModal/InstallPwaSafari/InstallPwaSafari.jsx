import React from "react";

import { TbShare2 } from "react-icons/tb";
import { MdOutlineAddBox } from "react-icons/md";

import styles from "./InstallPwaSafari.module.css";

const InstallPwaSafari = ({ closePrompt }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>For the best experience, install our app:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          select <TbShare2 className={styles.dotsIcon} /> in your browser,
        </li>
        <li>scroll down,</li>
        <li>
          and press <MdOutlineAddBox className={styles.installIcon} />
          (add to home screen)
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaSafari;