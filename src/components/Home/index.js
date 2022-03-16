import React, { useEffect, useState } from "react";
import axios from "axios"
import arrow from "../../images/icon-arrow.svg";

export default function Home () {

    const [ipAddress, setIpAddress] = useState("");
    const [timeZone, setTimezone] = useState("")
    const [country, setCountry] = useState("")
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [asn, setAsn] = useState("")
    const [isp, setIsp] = useState("")
    const [error, setError] = useState("")

    const getIpInformations = async (event) => {
        event.preventDefault();
        setIpAddress(document.querySelector("#ipInput").value);
        console.log("mon adresse Ip :", ipAddress)
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_KKLn7FwoBSlOdEE3TlBpJDZiCca74&ipAddress=${ipAddress}`)
        console.log(res.status)
        if(res.status == 200) {
            const location = res.data.location
            setTimezone(location.timezone)
            setCountry(location.country)
            setLat(location.lat)
            setLong(location.lng)
            setAsn(res.data.as.asn)
            setIsp(res.data.isp)
        } else {
            setError("Désolé mais l'adresse entrée n'existe pas ou est privée")
        }

    }
    const afficherIpInfos = () => {
        if(country) {
            return(
                <p>{timeZone}, {country}, {lat}, {long}, {asn}, {isp}</p>
            )
        } else {
            return (
            <p>{error}</p>
            )
        }
    }
    
    return (
        <>
        <div className="Ip-form">
            <input type="text" name="ipadress" id="ipInput" placeholder="Search for any IP address" />
            <button type="submit" onClick={getIpInformations}><img src={arrow} alt="Flêche permettant de soumettre l'input" /></button>
        </div>
        <div>
            {afficherIpInfos()}
        </div>
        </>
    )
}