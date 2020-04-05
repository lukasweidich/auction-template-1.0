import React, { useState } from 'react'
import { BlockPicker } from 'react-color'
const { Button, Typography } = require('@material-ui/core');


const ButtonColorPicker = (props) => {

    const [displayColorPicker, setDisplayColorPicker] = new useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    };

    const handleClose = () => {
        setDisplayColorPicker(false)
    };

    const handleChange = (color, event) => {
        props.onChangeComplete(color.hex)
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }
    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    return (
        <div>
            <div style={{ margin: "2px", display: "flex", flexDirection: "row", alignItems: "center" }} onClick={handleClick}>
                <div style={{ background: props.templateColor, height: "22px", width: "22px", cursor: "pointer", position: "relative", border: "1px solid black", borderRadius: "4px" }}></div>
                <Button>{props.text}</Button>
            </div>
            {
                displayColorPicker ? <div style={popover}>
                    <div style={cover} onClick={handleClose} />
                    <BlockPicker color={props.templateColor} colors={props.colors} onChangeComplete={handleChange} triangle={"hide"} style={{ fontFamily: "sans-serif" }} />
                </div> : null
            }
        </div >
    )
}

export default ButtonColorPicker