import React from "react";

import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div class={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
