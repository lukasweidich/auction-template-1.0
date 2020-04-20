import React from "react"
import DemITclassic from "../ebay-templates/dem-it-classic"
import DemITyellow from "../ebay-templates/dem-it-yellow"
import Kuststorm from "../ebay-templates/kuststorm"

const createReactFromItem = (props) => {
    if (props.templateId === "dem-it-classic") {
        return <DemITclassic {...props} />
    } else if (props.templateId === "solstorm") {
        return <DemITyellow {...props} />
    } else if (props.templateId === "kuststorm") {
        return <Kuststorm {...props} />
    }
    else {
        alert("Es wurde kein Template ausgewählt.")
    }
}

export default createReactFromItem