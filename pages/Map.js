import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

function SimpleMap() {
  const data  = {
    center: {
      lat: 36.1565432,
      lng: -86.7234644
    },
    zoom: 11
  };
  
  const Markers = [ {

    lat: 36.1565432, lng: -86.7234644,
    
    title: "Bike Accident",
    
    Location: "Latur",
    
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwPlyn21zGs3d6MLyS32Ntap2vub3zfYEKkg&usgp-CAU"
  },{
    lat: 36.1521981,
    
    lng: -86.7801724, title: "Car Accident",
    
    Location: "Ausa",
    
    image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPCjicyBwajY9LsLMZKd6oWqs3WyVAm9jxkw&usqp=CAU"
  },{
       lat: 36.1577547,
    
    lng: -86.7785841,
    
    title: "Motorcycle Accident",
    
    Location: "Pune",
    
    image : "https://static.india.com/wp-content/uploads/2021/02/Accident-Maon.jpg"
  },{
    lat: 36.1480674,
    
    lng: -86.8382887,
    
    title: "Car Accident", Location: "Nagar",
    
    image : "https://static.india.com/wp-content/uploads/2021/02/Accident-Maon.jpg" 
  },{
    lat: 36.1059131,
    
    lng: -86.7906082,
    
    title: "Truck Accident", Location: "Ahmedpur",
    
    image : "https://cdn.akamai.steamstatic.com/steam/apps/852220/header.jpg?t-1637776731"
    
  },{
    lat: 36.1079131,
    
    lng: -86.7986082,
    
    title: "Truck Accident",
    
    Location: "Mumbai",
    
    image : "https://cdn.akamai.steamstatic.com/steam/apps/852220/header.jpg?t=1637776731"
  },{
    lat: 36.1058191,
    
    lng: -86.7905082,
    
    title: "Bus Accident", Location: "Tathwade",
    
    image : "https://keralakaumudi.com/web-news/en/2019/11/NMAN0103898/image/bus-accident-.1572849217.jpg"
    
  }]


    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyASQZuMTo-aN8TrFkRVnXVA0XMkcNve0F8' }}
          defaultCenter={data.center}
          defaultZoom={data.zoom}
        >
         {Markers && Markers.map((data , key)=>
        <div key={data.key} lat={data.lat} lng={data.lng} onClick={()=>alert(data.Location)}>
            <img src={data.image} height="70px" width='70px' style={{borderRadius:30}} />
          </div>
         )}

        
        </GoogleMapReact>
      </div>
    );
  
}

export default SimpleMap;