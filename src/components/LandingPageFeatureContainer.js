import React from "react"

const FeatureContainer = props => {
    return (
        <div id="auction-template-background-lines-only" style={{ height: "100vh", backgroundColor: "#e6e6e6" }}>
            <div id="features" style={{ marginLeft: "10em", marginRight: "10em" }}>
                {props.children}
            </div>
        </div>
    )
}

export default FeatureContainer;