import React from 'react';
import Nav from '../comps/Nav';
import styles from "../styles/User.module.scss";

export default function User() {
  return (
      <>


  <Nav />
  <div className={styles.User_page}>
    <h1>Hello Akash 👋</h1>
    <h4>Thank you for being a part of us..</h4>

    <div className={styles.add_blocks}>
    <div className={styles.block}>
        <img src="/warning-animate.svg" alt="" />
        <h6>Add Construction Point</h6>
    </div>

    <div className={styles.block}>
        <img src="https://media.istockphoto.com/photos/-picture-id140471781?k=20&m=140471781&s=612x612&w=0&h=Sm8G_JRBKlxuwIPEOZ9ZYhvkmqlL1kbvglGRPsQEaRc=" alt="" />
        <h6>Add dangerous Mountaion area</h6>
    </div>
    <div className={styles.block}>
        <img src="/pngwing.com (1).png" alt="" />
        <h6>Add Accident Collision point</h6>
    </div>
    <div className={styles.block}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzYVEbWzOrp3hyGrfAITPOFpmEMyap14LHw&usqp=CAU" alt="" />
        <h6>Add Most Dangerous U-Turn</h6>
    </div>
    </div>


  </div>
  </>
    );
}
