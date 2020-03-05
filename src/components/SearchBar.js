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
            borderColor: props.colors.border,
            backgroundImage: "url('search.png')",
            paddingLeft: "20px"

        },
        button: {
            margin: "2px",
            backgroundColor: props.colors.fill,
            borderColor: props.colors.border,
            cursor: "pointer"
        },
    }

const onKeyUpHandler = (event) => {
   // if(event.keyCode === 13 || event.which === 13){
        console.log("hallo")
    //}
}

    return (
        <div style={styles.container}>
            <span onKeyUp={onKeyUpHandler} style={styles.text}>{props.labelText}</span>
            <input style={styles.input} onChange={props.change} placeholder="eBay Nutzernamen eingeben"></input>
            <button style={styles.button} onClick={props.click}>{props.buttonText}</button>
        </div>
    )
}



export default SearchBar