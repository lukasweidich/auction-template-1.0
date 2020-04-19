import React from "react"

const InfoBlock = (props) => {
    return (
        <div class="auction-template-background-lines auction-template-landing-info">
            <div class="auction-template-landing-info-content">
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                    <div class="auction-template-landing-spacer">
                    </div>
                    <div class="auction-template-landing-info-content">
                        <h1 class="auction-template-landing-info-content-headline">{props.title}</h1>
                    </div>
                </div>
            </div>
            <div class="auction-template-landing-info-content">
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <div class="auction-template-landing-info-content">
                        <p class="auction-template-landing-info-content-text">{props.text}</p>
                    </div>
                    <div class="auction-template-landing-spacer">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoBlock;