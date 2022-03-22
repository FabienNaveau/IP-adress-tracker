
import React, { useEffect, useState } from "react";
import "./index.css"
import axios from "axios"
import arrow from "../../images/icon-arrow.svg";
import L from "leaflet";



export default function Home () {

    const [ipAddress, setIpAddress] = useState("");
    const [timeZone, setTimezone] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(37.0902);
    const [long, setLong] = useState(-95.7129);
    const [asn, setAsn] = useState("");
    const [isp, setIsp] = useState("");
    const [zoom, setZoom] = useState(3)
    const [error, setError] = useState("");
    

    const getIpInformations = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_KKLn7FwoBSlOdEE3TlBpJDZiCca74&ipAddress=${ipAddress}`)
            
            if(res) {
                const location = res.data.location
                setTimezone(location.timezone)
                setCountry(location.country)
                setLat(location.lat)
                setLong(location.lng)
                setAsn(res.data.as.asn)
                setIsp(res.data.isp)
                setZoom(13)
                setError("")
                
            } else {
                throw new Error
            }
        } catch(error) {
            setError("Désolé mais cette adresse IP n'existe pas !")
            return
        }

    }
    const afficherIpInfos = () => {
        if(!error && !country) {
            return(
                <p>Veuillez entrer une adresse IP</p>
            )
        } else if (!error) {
            return (
                <p>{timeZone} {country} {lat} {long} {asn} {isp}</p>
            )
        } else {
            return (
                <p>{error}</p>
            )
        }
    }
    const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
    
      // Define the styles that are to be passed to the map instance:
      const mapStyles = {
        overflow: "hidden",
        width: "100%",
        height: "80vh"
      };

      const mapParams = {
        center: [lat, long],
        zoom,
        minZoom: 1,
        maxZoom: 18,
        fadeAnimation: true,
        zoomAnimation: true,
        zoomControl: true,
        maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
        layers: [MAP_TILE]
      };


      useEffect(() => {
        
        const container = L.DomUtil.get('map');
        if(container != null){
        container._leaflet_id = null;
        }
        const map = L.map("map", mapParams);
        map.flyTo([lat, long], zoom, {
            animate: true,
            duration: 1.5
        });
        if(zoom !== 3) {
            L.marker([lat, long]).addTo(map).bindPopup(isp)
        }
        
      }, [lat, long, zoom]);
    
    
    
    
    return (
        <>
        <div className="Ip-form">
            <h1>IP Address Tracker</h1>
            <form>
                <input type="text" name="ipaddress" id="ipInput" placeholder="Search for any IP address" autoFocus onChange={(event) => {setIpAddress(event.target.value)}}/>
                <input type="image" onClick={getIpInformations} src={arrow}/>
            </form>
        </div>
        <div className="infos">
            {afficherIpInfos()}
        </div>
        <div>
            <div id="map" style={mapStyles} />
        </div>
        </>
    )
}