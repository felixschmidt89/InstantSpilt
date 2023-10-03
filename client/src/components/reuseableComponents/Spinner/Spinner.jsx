import React from "react";
import styles from "./Spinner.module.css";

// Source: https://github.com/n3r4zzurr0/svg-spinners/blob/main/svg-css/6-dots-rotate.svg?short_path=6727f19
const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <svg
        className={styles.spinner}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'>
        <g className={styles.spinner}>
          <circle cx='12' cy='2.5' r='1.5' />
          <circle cx='16.75' cy='3.77' r='1.5' />
          <circle cx='20.23' cy='7.25' r='1.5' />
          <circle cx='21.50' cy='12.00' r='1.5' />
          <circle cx='20.23' cy='16.75' r='1.5' />
          <circle cx='16.75' cy='20.23' r='1.5' />
          <circle cx='12' cy='21.5' r='1.5' />
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
