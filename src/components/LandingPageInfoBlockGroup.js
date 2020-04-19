import React from "react"

const InfoBlockGroup = (props) => {
    return (
        <div className="auction-template-background-lines-only" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-around", backgroundColor: "#E6E6E6" }}>
            {props.children.map(child => {
                return (
                    <div className="auction-template-landing-info-wrapper">
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default InfoBlockGroup;