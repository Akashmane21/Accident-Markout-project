import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Formik, Field, Form } from "formik";
import styles from "../styles/Home.module.scss";
import firebase from '../db/firebase';
export default function Auth() {
console.log(firebase);
    const [isLogin, setisLogin] = useState(true);

    


    const newRegister = async (data) => {    
      
     
      fetch('https://akash-flask-server.herokuapp.com/hashIt?pass=Your_password')
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });


        const user = {
          Name:data.username,
          Phone:data.phone ,
          Password:data.password,
          email:data.email
        }
        alert(JSON.stringify(user))

    }

    function newLogin({email , password}) {
        const name = email + "_" + password;
        alert(name)
    }




  return (
  <div className={styles.Auth}>
<div className={styles.poster}>
<img src="/Journey-amico.svg" alt="" />
</div>


 <div  className={styles.form}>
     
      
{isLogin  ?  (
<div >
<h2> Log in </h2>
              <h6>Hello , welcome back to SafeJourney.io</h6>
                                    <div className={styles.forminput}>

              <Formik
              
                      initialValues={{ email: "", password: "" }}
                      onSubmit={async (values) => {
                        newLogin(values);
                      }}
                    >
                      <Form >

                      <span>
                      <h5>Email : </h5>
                        <Field placeholder="example@gmail.com" name="email" type="email" required={true}/>
                      </span>
                      <br />
            
                     <span>
                     <h5>Password:</h5>
                        <Field placeholder="********" name="password" type="password" required={true} />
                     </span>
                     <br />
                     

                          <div className={styles.joinbtn}>
                            <button type="submit">Login</button>
                          </div>
                          <h5>
                Dont Have Account ? <h4 onClick={()=> setisLogin(false)}>Register Now</h4>
              </h5>
                    
                      </Form>
                    </Formik>
 </div>
                   


</div>
)

:(
    <>
    <h2> Register Now </h2>
              <h6>Hello , welcome to SafeJourney.io</h6>

              <Formik
                      initialValues={{ username: "", password: "" , phone:"" }}
                      onSubmit={async (values) => {
                        newRegister(values);
                      }}
                    >
                      <Form >
                      <div className={styles.reg}>

                      <span>
                      <h5>Name : </h5>
                        <Field placeholder="Enter your Name" name="username" type="text" required={true}/>
                      </span>
                      <br />

                      <span> 
                      <h5>Phone : </h5>
                        <Field placeholder="Enter your phone" name="phone" type="Phone" required={true} />
                     </span>
                     <br />

                     <span> 
                     <h5>Email : </h5>
                        <Field placeholder="example@gmail.com" name="email" type="email" required={true} />
                     </span>
                     <br />

                     <span>
                     <h5>Password : </h5>
                        <Field placeholder="********" name="password" type="password" required={true} />
                     </span>
                     <br />
                      
                     </div>

                          <div className={styles.joinbtn}>
                            <button type="submit">Register</button>
                          </div>
                      </Form>
                    </Formik>
                    <h5>
                Already Have a Account ? <h4 onClick={()=> setisLogin(true)}>Login</h4>
              </h5>
     </>
)}
  </div> 


</div>
 
  
    );
}
