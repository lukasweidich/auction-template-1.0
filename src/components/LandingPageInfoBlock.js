import React from "react"

const InfoBlock = (props) => {
    return (
        <div id="auction-template-background-lines" style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "flex-start", backgroundColor: "#e6e6e6" }}>
            <div style={{ width: "50%" }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                    <div style={{ width: "50%" }}>
                    </div>
                    <div style={{ width: "50%" }}>
                        <h1 style={{ paddingRight: "2.5em", marginTop: 0, fontSize: "2em", textAlign: "right" }}>{props.title}</h1>
                    </div>
                </div>
            </div>
            <div style={{ width: "50%" }}>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <div style={{ width: "50%" }}>
                        <p style={{ marginTop: 0 }}>{props.text}</p>
                    </div>
                    <div style={{ width: "50%" }}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoBlock;