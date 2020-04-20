import React from "react"
import StyledPage from "../components/StyledPage"
import "../App.css"
const { Button } = require('@material-ui/core');

const notFound = (props) => {

    return (
        <StyledPage>
            <div style={{
                backgroundImage: 'url("https://dem-it.de/auction-template/404.png")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundAttachment: "cover",
                height: "100vh"
            }}>
                <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h1 style={{ color: "#000", fontFamily: 'Source Sans Pro, Helvetica, sans-serif', fontWeight: "bold", margin: "0", padding: "0" }}>Ups, hierbei ist etwas schiefgelaufen!</h1>
                    <h3 style={{ color: "#000", fontFamily: 'Source Sans Pro, Helvetica, sans-serif' }}>Leider konnten wir den angegebenen Link nicht finden.</h3>
                    <Button href="/" variant="contained" color="secondary">Zurück zur Basis</Button>
                </div>
            </div>
        </StyledPage >
    )

}

export default notFound;
