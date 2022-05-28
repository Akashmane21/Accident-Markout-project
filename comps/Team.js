import React from 'react';
import styles from "../styles/Home.module.scss";

export default function Team() {
  return(
     <>
     <div className={styles.Team}>
        <h1>May your journey be eye-opening!</h1>
        <div className={styles.All}>

<div className={styles.team_card}>
    <div className={styles.news}>
        <h3>Subscribe for Newsletter</h3>
        <div className={styles.newsinput}>
            <input placeholder='example@gmail.com ' type="text" />
            <button>Subscribe</button>
        </div>
    </div>
    <img src="/Travelers-bro.svg" alt="" />

</div>

</div>

    {/* <div className={styles.All}>

        <div className={styles.team_card}>
            <img src="https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fy.png?alt=media&token=bd47121d-8a24-4b00-99dd-ed8e36ced485" alt="" />
        <h3>Akash Mane</h3>
        </div>

        <div className={styles.team_card}>
            <img src="https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fy.png?alt=media&token=bd47121d-8a24-4b00-99dd-ed8e36ced485" alt="" />
        <h3>Akash Mane</h3>
        </div>

        <div className={styles.team_card}>
            <img src="https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fy.png?alt=media&token=bd47121d-8a24-4b00-99dd-ed8e36ced485" alt="" />
        <h3>Akash Mane</h3>
        </div>

        <div className={styles.team_card}>
            <img src="https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fy.png?alt=media&token=bd47121d-8a24-4b00-99dd-ed8e36ced485" alt="" />
        <h3>Akash Mane</h3>
        </div>
    </div> */}
  </div>
</>
  )
}
