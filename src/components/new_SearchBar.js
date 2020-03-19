import React, { useState } from "react"

const SearchBar = (props) => {

    // const [inputText, setInputText] = new useState("")

    // const onChangeHandler = (event) => {
    //     setInputText(event.target.value)
    // }

    // const onKeyDownHandler = (event) => {
    //     if (event.key === "Enter") {
    //         console.log(inputText)
    //     }
    // }

    const style = {
        container: {
            height: "20px",
            border: "1px solid lightcoral",
            overflow: "hidden",
            margin: "5px 0 5px 0",
            minWidth: "243px",
            width: "100%",
            display: "inline-flex"
        },
        input: {
            border: "0",
            paddingLeft: "25px",
            flex: "1",
            display: "block",
            backgroundImage: `url('${props.iconURL}')`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center left",
        }, button: {
            border: "0",
            borderLeft: "1px solid lightcoral",
            overflow: "hidden"
        }
    }

    return (
        <div>
            <div style={style.container}>
                <input
                    value={props.value}
                    placeholder={props.placeholder}
                    style={style.input}
                    onChange={props.search_onChange}
                    onKeyDown={props.search_onKeyDown}
                />
                {props.button ?
                    <button onClick={props.search_onClick}>
                        Auswählen
                </button>
                    :
                    null}
            </div>
        </div>
    )
}

export default SearchBar;