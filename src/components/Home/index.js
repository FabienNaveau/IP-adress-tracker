import React, { useState } from "react";
import axios from "axios"
import arrow from "../../images/icon-arrow.svg";

export default function Home () {

    const [ipAddress, setIpAddress] = useState("");



    const getInputValue = (event) => {
        event.preventDefault();
        setIpAddress(document.querySelector("#ipInput").value);
        console.log(ipAddress)
    }

    const getIpInformations = async () => {
        const res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_KKLn7FwoBSlOdEE3TlBpJDZiCca74&ipAddress=${ipAddress}`)
        console.log(res.data)
        
    }

    
    
    return (
        <>
        <div className="Ip-form">
            <input type="text" name="ipadress" id="ipInput" placeholder="Search for any IP address" />
            <button type="submit" onClick={getInputValue}><img src={arrow} alt="Flêche permettant de soumettre l'input" /></button>
        </div>
        </>
    )
}