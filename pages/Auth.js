import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Formik, Field, Form } from "formik";
import styles from "../styles/Home.module.scss";

export default function Auth() {

    const [isLogin, setisLogin] = useState(true);

    


    const newRegister = (data) => {    
      
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
              <Formik
                      initialValues={{ email: "", password: "" }}
                      onSubmit={async (values) => {
                        newLogin(values);
                      }}
                    >
                      <Form >
                      <div className={styles.forminput}>

                      <span>
                      {/* <i class="fas fa-user"></i> */}
                      <h5>Email : </h5>
                        <Field placeholder="example@gmail.com" name="email" type="email" required={true}/>
                      </span>
                      <br />
            
                     <span>
                     {/* <i class="fas fa-lock"></i> */}
                     <h5>Password:</h5>
                        <Field placeholder="********" name="password" type="password" required={true} />
                     </span>
                     <br />
                      </div>

                          <div className={styles.joinbtn}>
                            <button type="submit">Login</button>
                          </div>

                         
                    
                      </Form>
                    </Formik>
                    <h5>
                Don't Have Account ? <h4 onClick={()=> setisLogin(false)}>Create Account</h4>
              </h5>


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
                      <div >

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
