import React from "react"

const Hero = props => {
    return <div style={{ height: "100vh", marginTop: "-69px", width: "100%", display: "flex", flexDirection: "row" }}>
        <div id="auction-template-background-lines" style={{ width: "50%", backgroundColor: "#e6e6e6", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
            <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <div style={{ width: "50%" }}>
                </div>
                <div className="auction-template-top" style={{ paddingRight: "5em", width: "50%" }}>
                    <h1 style={{ fontWeight: "bold", lineHeight: "1.1", fontSize: "5em", textAlign: "right" }}>STEIGERE DEINE UMSÄTZE</h1>
                    <h1 style={{ marginTop: 0, fontSize: "2em", textAlign: "right" }}>MIT AUCTION TEMPLATE</h1>
                    <p style={{ marginTop: 0, textAlign: "right" }}>Generiere Deine persönliche eBay Auktionsvorlage in Sekundenschnelle</p>
                </div>
            </div>
        </div>
        <div style={{ width: "50%", backgroundImage: "url(" + "https://dem-it.de/auction-template/starting-rocket-blurred.png" + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
        </div>
    </div>
}

export default Hero