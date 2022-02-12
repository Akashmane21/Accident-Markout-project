import React , { useState  , useEffect} from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle 
} from "react-google-maps";




const Markers =  [ {
  lat: 36.1565432,
    lng: -86.7234644,
    title:"Bike Accident",
    Location : "Latur",
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPiyn21zGs3d6MLyS3zNtap2vubJzfYEKkg&usqp=CAU"

  },
  {
    lat: 36.1521981,
    lng: -86.7801724,
    title:"Car Accident",
    Location : "Ausa",
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPCjicyBWajY9LsLMZKd6oWqs3WyVAm9jxKw&usqp=CAU"
  },
  {
    lat: 36.1577547,
    lng: -86.7785841,
    title:"Motorcycle Accident",
    Location : "Pune",
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfdSfUzb9wtNKnM54tN_rWD41ZPEGGNJ7Zw&usqp=CAU"
  },
  {
    lat: 36.1400674,
    lng: -86.8382887,
    title:"Car Accident",
    Location : "Nagar",
    image : "https://static.india.com/wp-content/uploads/2021/02/Accident-Maon.jpg"
  },
  {
    lat: 36.1059131,
    lng: -86.7906082,
    title:"Truck Accident",
    Location : "Ahmedpur",
    image : "https://cdn.akamai.steamstatic.com/steam/apps/852220/header.jpg?t=1637776731"
  },
  {
    lat: 36.1079131,
    lng: -86.7986082,
    title:"Truck  Accident",
    Location : "Mumbai",
    image : "https://cdn.akamai.steamstatic.com/steam/apps/852220/header.jpg?t=1637776731"
  }
,
  {
    lat: 36.1058131,
    lng: -86.7905082,
    title:"Bus Accident",
    Location : "Tathwade",
    image : "https://keralakaumudi.com/web-news/en/2019/11/NMAN0103898/image/bus-accident-.1572849217.jpg"
  },
  {
    lat: 36.1079131,
    lng: -86.7936082,
    title:"Railway Accident",
    Location : "Delhi",
    image : "https://english.mathrubhumi.com/polopoly_fs/1.2178777.1503244386!/image/image.jpg_gen/derivatives/landscape_894_577/image.jpg"
  }]

  console.log(Markers);




const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '650px' , width: "700px"};
const mapElementStyle = { height: '100%' };

export default function GoogleMaps(){
  const [card, setcard] = useState([])
  const [currlat, setcurrlat] = useState(" ")
  const [currlon, setcurrlon] = useState(" ")


  useEffect(() => {
   
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
    
    function showPosition(position) {
      console.log(position.coords.latitude);
      setcurrlat(position.coords.latitude)
      console.log(position.coords.longitude);
      setcurrlon(position.coords.longitude)

     const curr = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        title:"truck Accident",
        image : "https://cdn.akamai.steamstatic.com/steam/apps/852220/header.jpg?t=1637776731"
      }

     const Markders = Markers + curr;
      console.log('====================================');
      console.log(curr);
      console.log('====================================');

    }

    getLocation()

  }, [])

  function onMarkerClick(title){
    let obj = Markers.find(loc => loc.title === title);
    console.log(obj);
    setcard(obj)

}
const RegularMap = withScriptjs(

  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={ { lat: 36.1400674,
    lng: -86.8382887} }
      defaultOptions={ { scrollwheel: true } }
    >
    {Markers.map((mark, index) => (
        <Marker
         
          position={{ lat: mark.lat, lng: mark.lng }}
          title={mark.title}
          onClick={() => onMarkerClick(mark.title)}
         
        />
        ))}

    </GoogleMap>
  )));
  return (
    <div className="box">
    <RegularMap   
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBekwBDrwMMbT4NiKA_VVPrFvxatI-Rcyo"
      loadingElement={<div style={ loadingElementStyle } />}
      containerElement={<div style={ containerElementStyle } />}
      mapElement={<div style={ mapElementStyle } />}
    />
{card && 
(
  <>
  <div className="info">
  <img src={card.image} alt="" />
    <div className="info-data">

    <h1>{card.title}</h1>
    {/* <p>{card.lat}</p>
    <p>{card.lng}</p> */}
    <div class="Loc">
     <i class="fas fa-map-marker-alt"></i>
     <h2>{card.Location}</h2>
    </div>

    </div>
  </div>
  </>
)
}
 
    </div>
  );
}