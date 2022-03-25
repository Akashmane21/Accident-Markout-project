import React, { useEffect, useState } from "react";
import Nav from "../comps/Nav";
import styles from "../styles/User.module.scss";
import firebase from "../db/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// FOrm control
import LoadingButton from "@mui/lab/LoadingButton";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Fade from "react-reveal/Fade";

import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Add from "@mui/icons-material/Add";

import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function User() {
  const router = useRouter();
  const [AllData, setAllData] = useState([]);

  const [Userdata, setUserdata] = useState({ Name: "NA" });
  const [Dashactive, setDashactive] = useState("orangered");
  const [Dataactive, setDataactive] = useState("gray");

  const [Variactive, setVariactive] = useState("orangered");
  const [notactive, setnotactive] = useState("gray");

  const [Varidata, setVaridata] = useState([]);
  const [NotVaridata, setNotVaridata] = useState([]);

  const [Active, setActive] = useState("Dashboard");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let Mountain =
    "https://media.istockphoto.com/photos/-picture-id140471781?k=20&m=140471781&s=612x612&w=0&h=Sm8G_JRBKlxuwIPEOZ9ZYhvkmqlL1kbvglGRPsQEaRc=";
  let Constimg = "/warning-animate.svg";
  let Accimg = "/pngwing.com (1).png";
  let UTurnimg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzYVEbWzOrp3hyGrfAITPOFpmEMyap14LHw&usqp=CAU";

  useEffect(async () => {
    const Username = await localStorage.getItem("id");

    if (Username != null) {
      const User = await firebase
        .database()
        .ref(`BE-Project/All_Users/${Username}/Auth`);
      User.on("value", (snapshot) => {
        const Data = snapshot.val();
        setUserdata(Data);
      });
    } else {
      router.push("/");
      toast.error("User Not Authenticated...");
    }

    const alldatas = await firebase.database().ref(`BE-Project/All_Entries/`);
    alldatas.on("value", (snapshot) => {
      const AllEntries = [];
      const AllVarified = [];
      const AllnotVarified = [];
      const entries = snapshot.val();

      for (let id in entries) {
        if (entries[id].Userid == Username) {
          AllEntries.push({ id, ...entries[id] });

          if (entries[id].Varified == true) {
            AllVarified.push({ id, ...entries[id] });
          }

          if (entries[id].Varified == false) {
            AllnotVarified.push({ id, ...entries[id] });
          }
        }
      }
      const reversed = AllEntries.reverse();

      const varireversed = AllVarified.reverse();
      setVaridata(varireversed);
      setAllData(varireversed);

      const notvarireversed = AllnotVarified.reverse();
      setNotVaridata(notvarireversed);
    });
  }, []);

  async function Addpoint(Image, Type) {
    await localStorage.setItem("Image", Image);
    await localStorage.setItem("Type", Type);
    router.push("/Add");
  }

  async function Verified() {
    setAllData(Varidata);
  }

  async function NotVerified() {
    setAllData(NotVaridata);
  }

  return (
    <>
      <Nav />
      <div className={styles.User_page}>
        <h1>Hello {Userdata.Name} 👋</h1>
        <h4>Thank you for being a part of us..</h4>
        <div className="block">
          <div className="left">
            <Button
              onClick={() => {
                setActive("Dashboard");
                setDashactive("orangered");
                setDataactive("gray");
              }}
              variant="varient"
              startIcon={<DashboardIcon />}
              style={{ color: `${Dashactive}` }}
            >
              Dashboard
            </Button>

            <Button
              onClick={() => {
                setActive("Data");
                setDashactive("gray");
                setDataactive("orangered");
              }}
              variant="varient"
              startIcon={<EventNoteIcon />}
              style={{ color: `${Dataactive}`, paddingRight: 15 }}
            >
              All Entries
            </Button>
          </div>

          <div className="right">
            {Active == "Dashboard" && (
              <div className={styles.add_blocks}>
                <Fade left>
                  <div
                    className={styles.block}
                    onClick={() => Addpoint(Constimg, "Construction")}
                  >
                    <img src={Constimg} alt="" />
                    <h6>Add Construction Point</h6>
                  </div>
                </Fade>
                <Fade left>
                  <div
                    className={styles.block}
                    onClick={() => Addpoint(Mountain, "Mountain")}
                  >
                    <img src={Mountain} alt="" />
                    <h6>Add dangerous Mountain area</h6>
                  </div>
                </Fade>
                <Fade left>
                  <div
                    className={styles.block}
                    onClick={() => Addpoint(Accimg, "Accident")}
                  >
                    <img src={Accimg} alt="" />
                    <h6>Add Accident Collision point</h6>
                  </div>
                </Fade>
                <Fade left>
                  <div
                    className={styles.block}
                    onClick={() => Addpoint(UTurnimg, "UTurn")}
                  >
                    <img src={UTurnimg} alt="" />
                    <h6>Add Most Dangerous U-Turn</h6>
                  </div>
                </Fade>
              </div>
            )}

            {Active == "Data" && (
              <>
                <div className="Varibtns">
                  <Button
                    onClick={() => {
                      Verified();
                      setVariactive("orangered");
                      setnotactive("gray");
                    }}
                    variant="varient"
                    startIcon={<CheckCircleIcon />}
                    style={{ color: `${Variactive}` }}
                  >
                    Varified
                  </Button>

                  <Button
                    onClick={() => {
                      NotVerified();
                      setVariactive("gray");
                      setnotactive("orangered");
                    }}
                    variant="varient"
                    startIcon={<CancelIcon />}
                    style={{ color: `${notactive}`, paddingRight: 15 }}
                  >
                    Not Varified
                  </Button>
                </div>
                <div className="cardflex">
                  {AllData.length != 0 ? (
                    AllData.map((getData, key) => (
                      <Fade bottom>
                        <div className="infocard">
                          {getData.Name != "NA" && (
                            <div className="allinfocard">
                              <div className="flex">
                                {getData.BlackspotType == "Construction" && (
                                  <Tooltip title="Construction">
                                    <EngineeringIcon />
                                  </Tooltip>
                                )}
                                {getData.BlackspotType == "Mountain" && (
                                  <Tooltip title="Danger Hill area Road">
                                    <img
                                      src="https://media.istockphoto.com/photos/-picture-id140471781?k=20&m=140471781&s=612x612&w=0&h=Sm8G_JRBKlxuwIPEOZ9ZYhvkmqlL1kbvglGRPsQEaRc="
                                      height="30px"
                                      width="30px"
                                      style={{ borderRadius: 30 }}
                                    />
                                  </Tooltip>
                                )}
                                {getData.BlackspotType == "Accident" && (
                                  <Tooltip title="Accident">
                                    <DangerousIcon />
                                  </Tooltip>
                                )}
                                {getData.BlackspotType == "UTurn" && (
                                  <Tooltip title="UTurn Road area">
                                    <UTurnLeftIcon />
                                  </Tooltip>
                                )}

                                <h1>{getData.BlackspotType} Point</h1>
                              </div>
                              <div className="imgdiv">
                                {getData.Image == "NA" ? (
                                  <img
                                    src="https://th.bing.com/th/id/R.1a12b4c6a85c3d3d0356b8b0982e3038?rik=%2bN8VUyxPhKxwsA&riu=http%3a%2f%2fvignette3.wikia.nocookie.net%2flego%2fimages%2fa%2fac%2fNo-Image-Basic.png%2frevision%2flatest%3fcb%3d20130819001030&ehk=4LPMn2YupbS2wKmWBvjF5%2bFz434RztzcY3x7Pg99GBI%3d&risl=&pid=ImgRaw&r=0"
                                    height="200px"
                                    width="200px"
                                  />
                                ) : (
                                  <img
                                    src={getData.Image}
                                    height="200px"
                                    width="200px"
                                  />
                                )}
                              </div>

                              <br />

                              <div className="flex">
                                <h4> Date & Time : </h4>
                                <h3>
                                  {" "}
                                  {getData.date} , {getData.time}{" "}
                                </h3>
                              </div>

                              <div className="flex">
                                <h4> Location : </h4>
                                <h3>
                                  {" "}
                                  {getData.City} , {getData.District} ,
                                  {getData.State} , {getData.Country}{" "}
                                  {getData.Pincode}{" "}
                                </h3>
                              </div>

                              {getData.BlackspotType == "Accident" && (
                                <>
                                  <div className="flex">
                                    <h4> Dead Count : </h4>
                                    <h3>{getData.Dead} </h3>
                                  </div>

                                  <div className="flex">
                                    <h4> Injured Count : </h4>
                                    <h3> {getData.Injured} </h3>
                                  </div>
                                </>
                              )}

                              {getData.BlackspotType == "Construction" && (
                                <>
                                  <div className="flex">
                                    <h4> Completedays : </h4>
                                    <h3> {getData.Completedays}</h3>
                                  </div>

                                  <div className="flex">
                                    <h4> ConstType : </h4>
                                    <h3>{getData.ConstType}</h3>
                                  </div>
                                </>
                              )}

                              {getData.BlackspotType == "UTurn" && (
                                <div className="flex">
                                  <h4> Uturntype : </h4>

                                  <h3>{getData.Uturntype}</h3>
                                </div>
                              )}

                              <div className="flex">
                                <h4> Description : </h4>
                                <h3> {getData.Description}</h3>
                              </div>
                            </div>
                          )}
                        </div>
                      </Fade>
                    ))
                  ) : (
                    <Fade bottom>
                      <div className="not">
                        <h1>There is No Entry from your Side !</h1>
                        <br />
                        <br />
                        <center>
                          <Button
                            onClick={() => {
                              setActive("Dashboard");
                              setDashactive("orangered");
                              setDataactive("gray");
                            }}
                            variant="varient"
                            startIcon={<AddIcon />}
                            style={{ color: `green` }}
                          >
                            Add Now
                          </Button>
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                        </center>
                      </div>
                    </Fade>
                  )}
                </div>
              </>
            )}
          </div>
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
    </>
  );
}
