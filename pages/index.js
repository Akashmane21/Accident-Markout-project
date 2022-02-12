import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Add from '../comps/Add_block'
import Footer from '../comps/Footer'
import Intro from '../comps/intro'
import Team from '../comps/Team'
import styles from '../styles/Home.module.scss'
import Router from 'next/router';

export default function Home() {

  useEffect(() => {
    
  }, []);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Safe Journey!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


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

      <Intro />
      <Add />
      <Team />
      <Footer />



    </div>
  )
}
