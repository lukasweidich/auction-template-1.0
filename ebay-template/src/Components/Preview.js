import React from "react"

const Preview = (props) => {
    let styles = {
        container: {
            margin: "24.3px",
            display: "inline-block",
            flex: "1",
        },
        heading: {
            border: "1px solid lightcoral",
            backgroundColor: "lightgrey",
            textAlign: "center"
        },
        contentBox: {
            border: "1px solid lightcoral",
            backgroundColor: "white",
            height: "100%"
        },
        content: {
            margin: "5%"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.heading}>
                <h5>{props.title}</h5>
            </div>
            <div style={styles.contentBox}>
                <div style={styles.content}>
                    {props.content}
                </div>
            </div>

        </div>
    )
}

export default Preview