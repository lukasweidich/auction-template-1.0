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
            <Preview title={"VORSCHAU"} content={<div dangerouslySetInnerHTML={{ __html: props.text }} />} />
            <Preview title={"HTML"} content={<span style={{ fontFamily: '"Courier New", Courier, monospace' }}>{props.text}</span>} />
        </div>
    )
}

export default PreviewContainer