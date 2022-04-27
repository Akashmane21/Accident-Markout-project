import React, { useState } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from "formik";
import styles from "../styles/Home.module.scss";
import firebase from "../db/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Auth() {
  const router = useRouter();

  const [isLogin, setisLogin] = useState(true);

  const newRegister = async (data) => {
    toast.info("Processing...");

    const user = {
      Name: data.username,
      Phone: data.phone,
      Password: data.password,
      email: data.email,
      Varified: false,
      DPLink:
        "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fuser.png?alt=media&token=8d844cd3-4354-4ac1-a853-6cafa61a9f2f",
    };
    const Name = data.username + "_" + data.password;

    firebase
      .database()
      .ref(`BE-Project/All_Users/${Name}/`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          toast.info("User Already exists...");
        } else {
          firebase
            .database()
            .ref(`BE-Project/All_Users/${Name}/Auth`)
            .set(user)
            .then((res) => {
              localStorage.setItem("authcheck", "True");
              localStorage.setItem("id", Name);
              localStorage.setItem("UserData", JSON.stringify(user));

              router.push("/");
              toast.success("Register Successfully...");
            });
        }
      });
  };

  function newLogin({ username, password }) {
    const name = username + "_" + password;
    toast.info("Processing...");

    firebase
      .database()
      .ref(`BE-Project/All_Users/${name}/`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val();
          localStorage.setItem("authcheck", "True");
          localStorage.setItem("id", name);
          localStorage.setItem("UserData", JSON.stringify(user.Auth));
          router.push("/");
          localStorage.setItem("reload", "true");
          toast.success("Login Successfully...");
        } else {
          toast.error("Invalid Credentials...");
        }
      });
  }

  return (
    <div className={styles.Auth} style={{ paddingBottom: 80 }}>
      <div className={styles.poster}>
        <img src="/Journey-amico.svg" alt="" />
      </div>

      <div className={styles.form} style={{ paddingBottom: 90 }}>
        {isLogin ? (
          <div>
            <h2> Log in </h2>
            <h6>Hello , welcome back </h6>
            <div className={styles.forminput}>
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values) => {
                  newLogin(values);
                }}
              >
                <Form>
                  <span>
                    <h5>Name  </h5>
                    <Field
                      placeholder="Enter your User name"
                      name="username"
                      type="text"
                      required={true}
                    />
                  </span>
                  <br />

                  <span>
                    <h5>Password</h5>
                    <Field
                      placeholder="********"
                      name="password"
                      type="password"
                      required={true}
                    />
                  </span>
                  <br />

                  <div className={styles.joinbtn}>
                    <button type="submit">Login</button>
                  </div>
                  <h5>
                    Dont Have Account ?{" "}
                    <h4 onClick={() => setisLogin(false)}>Register Now</h4>
                  </h5>
                </Form>
              </Formik>
            </div>
          </div>
        ) : (
          <>
            <h2> Register Now </h2>
            <h6>Hello , welcome </h6>

            <Formik
              initialValues={{ username: "", password: "", phone: "" }}
              onSubmit={async (values) => {
                newRegister(values);
              }}
            >
              <Form>
                <div className={styles.reg}>
                  <span>
                    <h5>Name  </h5>
                    <Field
                      placeholder="Enter your Name"
                      name="username"
                      type="text"
                      required={true}
                    />
                  </span>
                  <br />

                  <span>
                    <h5>Contact </h5>
                    <Field
                      placeholder="Enter your phone"
                      name="phone"
                      type="Phone"
                      required={true}
                    />
                  </span>
                  <br />

                  <span>
                    <h5>Email Id </h5>
                    <Field
                      placeholder="example@gmail.com"
                      name="email"
                      type="email"
                      required={true}
                    />
                  </span>
                  <br />

                  <span>
                    <h5>Password  </h5>
                    <Field
                      placeholder="********"
                      name="password"
                      type="password"
                      required={true}
                    />
                  </span>
                  <br />
                </div>

                <div className={styles.joinbtn}>
                  <button type="submit">Register</button>
                </div>
              </Form>
            </Formik>
            <h5>
              Already Have a Account ?{" "}
              <h4 onClick={() => setisLogin(true)}>Login</h4>
            </h5>
          </>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
