import React from "react";
import styles from "../styles/Home.module.scss";

export default function Add_block() {
  return (
    <>
      <div className={styles.Add_Block}>
        <h1>Add a Blacksopt That you know , but we Don't</h1>

        <div className={styles.add_area}>
          <img src="/undraw_delivery_re_f50b.svg" alt="" />
          <div className={styles.add_info}>

          <h3>
            There are numerous blackspots out there, but a single person may not
            know all of them. Help others by adding blackspots you know.
          </h3>

          <div className={styles.block}>
            <div className={styles.add}>
            <i class="fas fa-plus"></i>
            <h4>Add Now</h4>

            </div>
            <div className={styles.add}>
            <i class="fas fa-map"></i>

            <h4>What is Blackspot ?</h4>

            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
