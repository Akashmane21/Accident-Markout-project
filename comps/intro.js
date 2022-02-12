import React from 'react';
import styles from '../styles/Home.module.scss'

export default function intro() {
  return(
      <>

          <div className={styles.intro}>
            
              {/* <img src="https://iconape.com/wp-content/png_logo_vector/a-safe-workplace-is-no-accident.png" alt="" /> */}
         <div className={styles.tag}>
             <h1>Find Safe & Obstacle Free Safe Route For your Next Journey ! </h1>
             <h3>
                 The Road ahead is may be a long but it must be a Safe so,
                 Dont Worry , We're here
                 Before you start your journey, tell us where you're heading and we'll show you if there are any blackspots in your way
             </h3>

             <button>Find Safe Route</button>
         </div>
          <div className={styles.car}>

          <img  src="/Travelers-pana (1).svg" alt="" />
          </div>
          </div>
      </>
  ) 
}
