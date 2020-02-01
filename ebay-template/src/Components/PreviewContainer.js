import React from "react"
import Preview from "./Preview"


const PreviewContainer = (props) => {
    let styles = {
        container: {
            display: "flex",
            flex: "1",
            flexDirection: "row",
            justifyContent: 'center'
        }
    }

    return (
        <div style={styles.container}>
            <Preview style={styles.preview} title={"VORSCHAU"} content={<div dangerouslySetInnerHTML={{ __html: props.text }} />} />
            <Preview style={styles.preview} title={"HTML"} content={<span>{props.text}</span>} />
        </div>
    )
}

export default PreviewContainer