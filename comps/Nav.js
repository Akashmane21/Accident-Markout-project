import React from 'react';
import styles from "../styles/Home.module.scss";

export default function Nav() {
  return (

    <nav>
    <div className={styles.header}>
      <img src="/icons/pngfind.com-journey-png-6403705 (1).png" alt="" />
      <li>
        <ul>About</ul>
        <ul>Find Safe route</ul>
        <ul>Add Black-spot</ul>
      </li>

<div className={styles.btns}>

      <button onClick={() => Router.push('/Auth')}>Login</button>
      <button onClick={() => Router.push('/Auth')}>Register</button>
</div>

    </div>
  </nav>
  );
}
