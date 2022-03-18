import React, { useEffect } from "react";
import L from "leaflet";

export default function Map () {

    const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
    
      // Define the styles that are to be passed to the map instance:
      const mapStyles = {
        overflow: "hidden",
        width: "100%",
        height: "100vh"
      };

      const mapParams = {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: false,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [MAP_TILE]
      };

      useEffect(() => {
        const map = L.map("map", mapParams);
        const marker = L.marker([51.505, -0.09]).addTo(map)
      }, []);
    
  return (
    <div>
      <div id="map" style={mapStyles} />
    </div>
  )
}

