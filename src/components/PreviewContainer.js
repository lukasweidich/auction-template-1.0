import React from "react"
import Preview from "./Preview"

const PreviewContainer = (props) => {
    let styles = {
        container: {
            height: "auto", width: "auto",
            display: "flex",
            flex: "1",
            flexDirection: "row",
            justifyContent: 'center'
        }
    }

    return (
        <div style={styles.container}>
            <Preview title={"VORSCHAU"} content={props.productDescription} />
        </div>
    )
}

export default PreviewContainer