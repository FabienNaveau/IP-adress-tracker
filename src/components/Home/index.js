import React, { useState } from "react"

export default function Home () {

    const [ipAddress, setIpAddress] = useState("");
    const getInputValue = () => {
        console.log("Mafonction fonctionne")
    }
    return (
        <>
        <div className="Ip-form">
            <input type="text" name="ipadress" id="ipInput" placeholder="Search for any IP address" />
            <button type="submit" onClick={getInputValue}><img src="/../../public/images/icon-arrow.svg" alt="bouton de validation" /></button>
        </div>
        </>
    )
}