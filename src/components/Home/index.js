import React, { useEffect, useState } from "react";
import axios from "axios"
import arrow from "../../images/icon-arrow.svg";



export default function Home () {

    const [ipAddress, setIpAddress] = useState("");
    const [timeZone, setTimezone] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [asn, setAsn] = useState("");
    const [isp, setIsp] = useState("");
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
    
    // initialize the map on the "map" div with a given center and zoom
    
    
    return (
        <>
        <div className="Ip-form">
            <input type="text" name="ipadress" id="ipInput" placeholder="Search for any IP address" onChange={(event) => {setIpAddress(event.target.value)}}/>
            <button type="submit" onClick={getIpInformations}><img src={arrow} alt="Flêche permettant de soumettre l'input" /></button>
        </div>
        <div>
            {afficherIpInfos()}
        </div>
        
        </>
    )
}