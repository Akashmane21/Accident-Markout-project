import React from 'react';
import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import Fade from 'react-reveal/Fade';

export default function intro() {
    const router = useRouter()

  return(
      <>

          <div className={styles.intro}>
            
         <div className={styles.tag}>
             <h1>Find Safe & Obstacle Free Route For your Next Journey ! </h1>
             <h3>
                 The Road ahead is may be a long but it must be a Safe so,
                 Dont Worry , We're here
                 Before you start your journey, tell us where you're heading and we'll show you if there are any blackspots in your way
             </h3>

             <button  onClick={()=> router.push('/Map')}>Find Safe Route</button>
         </div>
          <div className={styles.car}>
          <Fade right>
          <img  src="/Travelers-pana (1).svg" alt="" />
          </Fade>
          </div>
          </div>
      </>
  ) 
}
