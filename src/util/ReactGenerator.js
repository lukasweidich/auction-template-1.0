import React from "react"
import DemIT_classic from "../ebay-templates/dem-it-classic"
import DemIT_yellow from "../ebay-templates/dem-it-yellow"

const createReactFromItem = (props) => {
    if (props.templateId === "dem-it-classic") {
        return <DemIT_classic colors={props.colors} item={props.item} articleOptions={props.articleOptions} />
    } else if (props.templateId === "dem-it-yellow") {
        return <DemIT_yellow colors={props.colors} item={props.item} articleOptions={props.articleOptions} />
    }
    else {
        alert("Es wurde kein Template ausgewählt.")
    }
}

export default createReactFromItem