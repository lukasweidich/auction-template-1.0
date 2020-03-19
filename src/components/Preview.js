import React from "react"

const Preview = (props) => {

    const copyInnerText = (elements) => {
        let y = elements;
        console.log(y)
    }

    let styles = {
        container: {
            margin: "1% 5% 0 5%",
            display: "inline-block",
            flex: "1"
        },
        inline: {
            display: "inline-block",
        },
        heading: {
            border: "1px solid lightcoral",
            backgroundColor: "lightgrey",
            textAlign: "center",
        },
        headingItem: {
            margin: "0 5% 0 5%"
        },
        contentBox: {
            border: "1px solid lightcoral",
            backgroundColor: "white",
            height: "100%"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.heading}>
                <h5 style={styles.inline}>{props.title}</h5>
                <button style={styles.headingItem} onClick={() => copyInnerText(props.content)}>HTML-Code kopieren</button>
            </div>
            <div style={styles.contentBox}>
                <div>
                    {props.content}
                </div>
            </div>

        </div>
    )
}

export default Preview