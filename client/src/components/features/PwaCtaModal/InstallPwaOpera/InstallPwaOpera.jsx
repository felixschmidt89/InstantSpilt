// React and Third-Party Libraries
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { MdAddToHomeScreen } from "react-icons/md";

// Styles
import styles from "./InstallPwaOpera.module.css";

/**
 * Renders instructions for installing PWA via Opera Android app.
 * @returns {JSX.Element} React component.
 */
const InstallPwaOpera = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>For the best experience, install our app:</p>
      <ul className={styles.installPwaExplanationList}>
        <li>
          Select <HiDotsVertical className={styles.dotsIcon} /> in your browser,
        </li>
        <li>
          press <HiOutlinePlusCircle className={styles.addToIcon} />
          (add to...),
        </li>
        <li>
          and choose <MdAddToHomeScreen className={styles.homeScreenIcon} />{" "}
          home screen.
        </li>
      </ul>
    </div>
  );
};

export default InstallPwaOpera;
