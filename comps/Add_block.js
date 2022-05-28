import React from "react";
import styles from "../styles/Home.module.scss";
import { useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";


export default function Add_block() {
  const router = useRouter()


  function WhatBlackspot(){
    toast.success("Black-spots are locations which attract more accidents by comparison with other similar locations on the road system, or locations which have an accident number and/or rate greater than a defined minimum.")
  }
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
            <div className={styles.add} onClick={()=> router.push('/User')}>
            <i class="fas fa-plus"></i>
            <h4>Add Now</h4>

            </div>
            <div className={styles.add} onClick={()=> WhatBlackspot()}>
            <i class="fas fa-map"></i>

            <h4>What is Blackspot ?</h4>

            </div>
          </div>
          </div>
        </div>
      </div>

      <ToastContainer
          position="top-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
}
