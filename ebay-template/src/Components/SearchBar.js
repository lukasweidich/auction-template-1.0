import React from "react"

const SearchBar = (props) => {
    let styles = {
        container:
        {
            display: 'inline'
        },
        text: {
            margin: "2px",
            color: props.colors.text
        },
        input: {
            margin: "2px",
            borderRadius: "100px",
            backgroundColor: props.colors.fill,
            borderColor: props.colors.border

        }, button: {
            margin: "2px",
            backgroundColor: props.colors.fill,
            borderColor: props.colors.border,
            cursor: "pointer"
        },
    }

    return (
        <div style={styles.container}>
            <span style={styles.text}>{props.labelText}</span>
            <input style={styles.input} onChange={props.change}></input>
            <button style={styles.button} onClick={props.click}>{props.buttonText}</button>
        </div>
    )
}



export default SearchBar