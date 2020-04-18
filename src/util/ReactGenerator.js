import React from "react"
import DemITclassic from "../ebay-templates/dem-it-classic"
import DemITyellow from "../ebay-templates/dem-it-yellow"

const createReactFromItem = (props) => {
    if (props.templateId === "dem-it-classic") {
        return <DemITclassic {...props} />
    } else if (props.templateId === "dem-it-yellow") {
        return <DemITyellow {...props} />
    }
    else {
        alert("Es wurde kein Template ausgewählt.")
    }
}

export default createReactFromItem