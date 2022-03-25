import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from "formik";
import styles from "../styles/Home.module.scss";
import firebase from "../db/firebase";
import { ToastContainer, toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";

import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../comps/Nav";
import { Button, TextField } from "@mui/material";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Fade from "react-reveal/Fade";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const Input = styled("input")({
  display: "none",
});

export default function AddConstruction() {
  const router = useRouter();
  // Progress bar
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const [fullopen, setfullOpen] = useState(false);
  const handlefullClose = () => {
    setfullOpen(false);
  };
  const handlefullToggle = () => {
    setfullOpen(!fullopen);
  };

  const [Image, setImage] = useState("");
  const [Type, setType] = useState("");
  const [Lat, setLat] = useState("");
  const [Lng, setLng] = useState("");
  const [Name, setName] = useState("");
  const [Userdata, setUserdata] = useState({ Name: "NA" });
  const [Pin, setPin] = useState("");
  const [District, setDistrict] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [Country, setCountry] = useState("");
  const [Des, setDes] = useState("");
  const [uploadimg, setuploadimg] = useState("");

  const [Cities, setCities] = useState([]);
  const [Districts, setDistricts] = useState([]);
  const [States, setStates] = useState([]);
  const [Countries, setCountries] = useState([]);

  // Accident VAlues
  const [Dead, setDead] = useState("");
  const [Injured, setInjured] = useState("");

  // COnstruction Values
  const [Completedays, setCompletedays] = useState("");
  const [ConstType, setConstType] = useState("");

  // Uturn Values
  const [Uturntype, setUturntype] = useState("");

  const [Imageproof, setImageproof] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");

  useEffect(async () => {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    setdate(cDay + "/" + cMonth + "/" + cYear);

    let currentDatee = new Date();
    let ttime = currentDate.getHours() + ":" + currentDate.getMinutes();
    settime(ttime);

    setImage(localStorage.getItem("Image"));
    setType(localStorage.getItem("Type"));
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
    setName();

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
      toast.warning("User Not Authenticated...");
    }
  }, []);

  function Getloc() {
    setfullOpen(true);

    fetch(`https://api.postalpincode.in/pincode/${Pin}`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json[0].PostOffice)
        let C = [];
        let D = [];
        let S = [];
        let Cou = [];
        try {
          json[0].PostOffice.forEach((element) => {
            C.push(element.Name);
            S.push(element.State);
            D.push(element.District);
            Cou.push(element.Country);
          });
          setCities(C);
          setDistricts(D);
          setCountries(Cou);
          setStates(S);
          setCity(C[0]);
          setDistrict(D[0]);
          setCountry(Cou[0]);
          setState(S[0]);

          setfullOpen(false);
        } catch {
          setfullOpen(false);

          toast.warning("Plz Enter Valid pincode");
        }
      });
  }

  let files = [];
  const Chooseme = (e) => {
    try {
      files = e.target.files;

      var reader = new FileReader();
      reader.onload = function () {};
      reader.readAsDataURL(files[0]);
    } catch {
      toast.warning("Something Went Wrong!");
    }
  };

  const AddData = async () => {
    setLoading(true);
    setfullOpen(true);
    var x = document.getElementById("fileInput");
    var txt = "";
    // console.log(x.files[0]);
    toast(x.files[0].name);

    var uploadTask = firebase
      .storage()
      .ref("BEProject/" + x.files[0].name)
      .put(x.files[0]);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },

      // --------Error Handling-------------------------------

      function (err) {
        alert("Error to Saving the Image");
      },

      // ------------Submit image into Database---------------
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(async function (url) {
          console.log(url);
          const img = url;
          setuploadimg(url);

          const Userid = await localStorage.getItem("id");

          const Alldata = {
            Name: Userdata.Name,
            Userid: Userid,
            BlackspotType: Type,
            Varified: Userdata.Varified,
            VarifiedUser: Userdata.Varified,
            Pincode: Pin,
            City: City,
            District: District,
            State: State,
            Country: Country,
            lat: Lat,
            lng: Lng,
            Dead: Dead,
            Injured: Injured,
            Completedays: Completedays,
            ConstType: ConstType,
            Uturntype: Uturntype,
            Image: img,
            Description: Des,
            date: date,
            time: time,
          };

          firebase
            .database()
            .ref(`BE-Project/All_Entries/`)
            .push(Alldata)
            .then((res) => {
              toast.success("Submitted  Successfully...");
            });

          setLoading(false);
          setProgress(0);
          setfullOpen(false);
        });
      }
    );
  };

  return (
    <>
      <Nav />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={fullopen}
        onClick={handlefullClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={styles.Auth}>
        <Fade left>
          <div className={styles.poster}>
            <img src={Image} alt="" />
          </div>
        </Fade>

        <div className={styles.AddForm}>
          <Fade right>
            <h1>Add {Type} Point</h1>

            <div className={styles.Formdata}>
              <h6>
                Name : {Userdata.Name}
                {Userdata.Varified ? (
                  <Tooltip title="Varified User">
                    <img
                      src="https://clipground.com/images/verified-tick-png-6.png"
                      height="20px"
                      style={{ marginBottom: 4 }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Not Varified User">
                    <CancelIcon
                      style={{ color: "red", fontSize: 20, marginLeft: 10 }}
                    />
                  </Tooltip>
                )}
              </h6>
              <h6>
                Location : lat = {Lat} , Lon = {Lng}
              </h6>
              <TextField
                margin="dense"
                required
                label="Lattitude"
                value={Lat}
                onChange={(e) => setLat(e.target.value)}
                variant="outlined"
                style={{ width: 100 }}
              />
              <TextField
                margin="dense"
                required
                label="Longitude"
                value={Lng}
                onChange={(e) => setLng(e.target.value)}
                variant="outlined"
                style={{ width: 100 }}
              />

              <h6>
                Timestamp : {date} , {time}{" "}
              </h6>
              <br />
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values) => {
                  AddData(values);
                }}
              >
                <Form>
                  <TextField
                    variant="standard"
                    label="Enter Pincode"
                    type="text"
                    required
                    onChange={(e) => setPin(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiberPinIcon style={{ color: "lightblue" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  <Button
                    onClick={Getloc}
                    variant="text"
                    startIcon={<LocationOnSharpIcon />}
                  >
                    Get Locations
                  </Button>
                  <br />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      required
                      value={City}
                      onChange={(e) => setCity(e.target.value)}
                      label="City"
                    >
                      {Cities &&
                        Cities.map((data) => (
                          <MenuItem value={data}>{data}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      required
                      value={District}
                      onChange={(e) => setDistrict(e.target.value)}
                      label="District"
                    >
                      {Districts &&
                        Districts.map((data) => (
                          <MenuItem value={data}>{data}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  {/* <br /> */}
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      required
                      value={State}
                      onChange={(e) => setState(e.target.value)}
                      label="State"
                    >
                      {States &&
                        States.map((data) => (
                          <MenuItem value={data}>{data}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      required
                      value={Country}
                      onChange={(e) => setCountry(e.target.value)}
                      label="Country"
                    >
                      {Countries &&
                        Countries.map((data) => (
                          <MenuItem value={data}>{data}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <h4>Common Questions :</h4>
                  {Type == "Construction" && (
                    <>
                      <TextField
                        required
                        margin="dense"
                        onChange={(e) => setConstType(e.target.value)}
                        label="Which type of Construction is going on ?"
                        variant="outlined"
                        style={{ width: 500 }}
                      />
                      <TextField
                        required
                        margin="dense"
                        onChange={(e) => setCompletedays(e.target.value)}
                        label="How many days it will take to Complete ?"
                        variant="outlined"
                        style={{ width: 500 }}
                      />
                    </>
                  )}
                  {Type == "Accident" && (
                    <>
                      <TextField
                        margin="dense"
                        required
                        label="How many Peoples are dead 😔 ?"
                        value={Dead}
                        onChange={(e) => setDead(e.target.value)}
                        variant="outlined"
                        style={{ width: 500 }}
                      />
                      <TextField
                        margin="dense"
                        required
                        label="How many Peoples are Injured ?"
                        value={Injured}
                        onChange={(e) => setInjured(e.target.value)}
                        variant="outlined"
                        style={{ width: 500 }}
                      />
                    </>
                  )}
                  {Type == "UTurn" && (
                    <>
                      <TextField
                        margin="dense"
                        required
                        label="Which type of UTurn is there ?"
                        value={Uturntype}
                        onChange={(e) => setUturntype(e.target.value)}
                        variant="outlined"
                        style={{ width: 500 }}
                      />
                    </>
                  )}
                  <TextField
                    margin="dense"
                    required
                    label="Elaborate it (Description) ?"
                    value={Des}
                    onChange={(e) => setDes(e.target.value)}
                    variant="outlined"
                    style={{ width: 500 }}
                  />
                  <br />
                  <br />
                  <h4>
                    Select Image <PhotoCamera style={{ color: "gray" }} />{" "}
                  </h4>
                  <input
                    className="completebtn"
                    id="fileInput"
                    type="file"
                    onChange={Chooseme}
                  />
                  <br />
                  {/* <TextField margin="dense" required label="Add Image Link ?" value={Imageproof} onChange={(e)=> setImageproof(e.target.value)} variant='outlined' style={{width:500}} /> */}
                  <CircularProgressWithLabel value={progress} />
                  {/* <img src={Imageproof} id='img' height="200px" /> */}
                  <br /> <br />
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Submit
                  </Button>
                </Form>
              </Formik>
            </div>
          </Fade>
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
