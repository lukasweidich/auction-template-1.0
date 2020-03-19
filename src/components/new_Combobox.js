import React, { useState } from "react"

const Combobox = (props) => {

    const [selectedElement, setSelectedElement] = new useState("");

    // const onChangeHandler = (event) => {
    //     setInputText(event.target.value)
    // }

    const onChangeHandler = (event) => {
        setSelectedElement(event.target.value)
    }

    const style = {
        container: {
            border: "1px solid lightcoral",
            overflow: "hidden",
            margin: "5px 0 5px 0",
            display: "inline-flex",
            minWidth: "243px",
            width: "100%"
        },
        select: {
            height: "20px",
            backgroundColor: "white",
            border: "0",
            paddingLeft: "20px",
            backgroundImage: `url('${props.iconURL}')`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%"
        },
        option: {
            backgroundColor: "white"
        }, button: {
            border: "0",
            borderLeft: "1px solid #ccc",
            overflow: "hidden",
            backgroundColor: "lightgreen",
        }
    }

    // if (props.options) {
    //     const options = props.options.map(el => {
    //         return <option id={el.id} style={style.option}>{el.id} - {el.value}</option>
    //     })
    // }

    return (
        <div style={style.container}>
            <select style={style.select} onChange={props.onChange} defaultValue={-1}>
                <option style={style.option} value={-1}>Bitte ein Produkt auswählen...</option>
                {
                    props.items ?
                        props.items.sort().map((item, i) => {
                            return <option style={style.option} key={i} value={item.value}>{item.value} - {item.text}</option>
                        })
                        : null
                }
            </select>
        </div>
    )
}

export default Combobox;