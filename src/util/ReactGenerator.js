import React from "react"
import DemITclassic from "../ebay-templates/dem-it-classic"
import DemITyellow from "../ebay-templates/dem-it-yellow"

const createReactFromItem = (props) => {
    if (props.templateId === "dem-it-classic") {
        return <DemITclassic colors={props.colors} item={props.item} articleOptions={props.articleOptions} />
    } else if (props.templateId === "dem-it-yellow") {
        return <DemITyellow colors={props.colors} item={props.item} articleOptions={props.articleOptions} />
    }
    else {
        alert("Es wurde kein Template ausgewählt.")
    }
}

export default createReactFromItem