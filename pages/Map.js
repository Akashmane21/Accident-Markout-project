import React, { Component, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import firebase from "../db/firebase";
import UTurnLeftIcon from "@mui/icons-material/UTurnLeft";
import ConstructionIcon from "@mui/icons-material/Construction";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DangerousIcon from "@mui/icons-material/Dangerous";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import Tooltip from "@mui/material/Tooltip";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Fade from "react-reveal/Fade";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import Nav from "../comps/Nav";
import { Button, TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function SimpleMap() {
  const [AllData, setAllData] = useState([]);
  const [center, setcenter] = useState({ lat: "", lng: "" });
  const [LAT, setLAT] = useState("");
  const [LNG, setLNG] = useState("");
  const [getData, setgetData] = useState({ Name: "NA" });
  const [pin, setpin] = useState("");
  const data = {
    center: {
      lat: 36.1565432,
      lng: -86.7234644,
    },
    zoom: 11,
  };

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLAT(position.coords.latitude);
      setLNG(position.coords.longitude);
    });

    const alldatas =  firebase.database().ref(`BE-Project/All_Entries/`);
    alldatas.on("value", (snapshot) => {
      const todoList = [];
      const todos = snapshot.val();
      for (let id in todos) {
        if (todos[id].Varified) {
          todoList.push({ id, ...todos[id] });
        }
      }
      const reversed = todoList.reverse();
      setAllData(reversed);
      const tempcenter = {
        lat: reversed[0].lat,
        lng: reversed[0].lng,
      };
      console.log(reversed);
    });
  }, []);

  async function Search() {
    const alldatas = await firebase.database().ref(`BE-Project/All_Entries/`);
    alldatas.on("value", (snapshot) => {
      const todoList = [];
      const todos = snapshot.val();
      for (let id in todos) {
        if (todos[id].Pincode == pin) {
          todoList.push({ id, ...todos[id] });
        }
      }
      const reversed = todoList.reverse();
      setAllData(reversed);
      toast.success("Successfully Fetched...");
    });
  }

  return (
    <>
      <Nav />
      <div className="Form">
        <h1>Enter Your Source & Destination :- </h1>

        <div className="flex">
          <div className="formdata">
            <div className="flex">
              <TextField
                variant="outlined"
                label="Source Location"
                style={{ marginRight: 60 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MyLocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <CompareArrowsOutlinedIcon
                style={{ marginTop: 20, color: "gray" }}
              />
              <TextField
                variant="outlined"
                label="Destination Location"
                style={{ marginLeft: 60 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssistantDirectionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <br />
            <hr />

            <TextField
              value={pin}
              onChange={(e) => setpin(e.target.value)}
              variant="outlined"
              label="Search for perticular Pincode"
              style={{ marginLeft: 0 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon />
                  </InputAdornment>
                ),
              }}
            />

            <br />
            <Button
              onClick={Search}
              variant="varient"
              startIcon={<SearchIcon />}
              style={{ color: `green` }}
            >
              Search
            </Button>
            

            <center></center>

            <br />
          </div>

          <div className="instr">
            <div className="flex">
              <EngineeringIcon />
              <h3>Construction Point</h3>
            </div>

            <div className="flex">
              <DangerousIcon />
              <h3>Accident Point</h3>
            </div>

            <div className="flex">
              <UTurnLeftIcon />
              <h3>UTurn</h3>
            </div>

            <div className="flex">
              <img
                src="https://media.istockphoto.com/photos/-picture-id140471781?k=20&m=140471781&s=612x612&w=0&h=Sm8G_JRBKlxuwIPEOZ9ZYhvkmqlL1kbvglGRPsQEaRc="
                height="30px"
                width="30px"
                style={{ borderRadius: 30 }}
              />

              <h3>Danger hill Roads</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="block">
        <div style={{ height: "100vh", width: "100%", borderRadius: 40 }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyASQZuMTo-aN8TrFkRVnXVA0XMkcNve0F8",
            }}
            defaultCenter={{
              lat: 18.6179,
              lng: 73.749496,
            }}
            defaultZoom={10}
          >
            <div
              className="Marker"
              lat="18.617900"
              lng="73.749496"
              onClick={() => alert(data.Location)}
            >
              <Tooltip title="Your Location">
                <LocationOnIcon />
              </Tooltip>
              <h1>Your Location</h1>
            </div>

            {AllData &&
              AllData.map((data, key) => (
                <div
                  onClick={() => setgetData(data)}
                  className="Marker"
                  key={data.key}
                  lat={data.lat}
                  lng={data.lng}
                >
                  {data.BlackspotType == "Construction" && (
                    <Tooltip title="Construction">
                      <EngineeringIcon />
                    </Tooltip>
                  )}
                  {data.BlackspotType == "Mountain" && (
                    <Tooltip title="Danger Hill area Road">
                      <img
                        src="https://media.istockphoto.com/photos/-picture-id140471781?k=20&m=140471781&s=612x612&w=0&h=Sm8G_JRBKlxuwIPEOZ9ZYhvkmqlL1kbvglGRPsQEaRc="
                        height="30px"
                        width="30px"
                        style={{ borderRadius: 30 }}
                      />
                    </Tooltip>
                  )}
                  {data.BlackspotType == "Accident" && (
                    <Tooltip title="Accident">
                      <DangerousIcon />
                    </Tooltip>
                  )}
                  {data.BlackspotType == "UTurn" && (
                    <Tooltip title="UTurn Road area">
                      <UTurnLeftIcon />
                    </Tooltip>
                  )}
                </div>
              ))}
          </GoogleMapReact>
        </div>
      </div>
      <fade right>
        <div className="info">
          {getData.Name != "NA" && (
            <div className="allinfo">
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
                    src="https://th.bing.com/th/id/R.b1edc35f0fa63d0e0b3c9bc5537de942?rik=4XNH%2b8HlVbSxZQ&riu=http%3a%2f%2fwww.identdentistry.ca%2fidentfiles%2fno_image_available.png&ehk=BJbKzIejNVS%2fODb6YWAYoSdbp%2bITjTSErbM1bOval68%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                    height="200px"
                    width="200px"
                  />
                ) : (
                  <img src={getData.Image} height="200px" width="200px" />
                )}
              </div>

              <br />

              <div className="flex">
                <h4> Added by : </h4>
                <h3>
                  {" "}
                  {getData.Name}{" "}
                  {getData.VarifiedUser && (
                    <img src="https://clipground.com/images/verified-tick-png-6.png" />
                  )}{" "}
                </h3>
              </div>

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
                  {getData.City} , {getData.District} ,{getData.State} ,{" "}
                  {getData.Country} {getData.Pincode}{" "}
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
      </fade>
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
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default SimpleMap;
