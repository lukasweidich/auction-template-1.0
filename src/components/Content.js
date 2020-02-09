import React from "react"

const Content = (props) => {
    let styles = {
        content: {
            minHeight: "80vh",
            overflow: "hidden",
            display: "block",
            position: "relative",
            paddingBottom: "100px"
        }
    }

    return (
        <div style={styles.content}>
            {props.children}
        </div>
    )
}

export default Content

