import React from "react"

const InfoBlockGroup = (props) => {
    return (
        <div id="auction-template-background-lines-only" style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-around", backgroundColor: "#E6E6E6" }}>
            {props.children.map(child => {
                return (
                    <div>
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

export default InfoBlockGroup;