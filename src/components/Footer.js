import React from "react"

const Footer = (props) => {
    let styles = {
        footer: {
            position: "relative",
            bottom: "0",
            backgroundColor: "lightgrey"
        }
    }

    return (
        <div style={styles.footer}>
            <a href="https://dem-it.de">dem-it.de</a>
        </div>
    )
}

export default Footer