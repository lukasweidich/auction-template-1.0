import React, { useState } from 'react'
import { BlockPicker } from 'react-color'
const { Button, Typography } = require('@material-ui/core');


const ButtonColorPicker = (props) => {

    const [displayColorPicker, setDisplayColorPicker] = new useState(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };
    const handleOpen = () => {
        console.log("tests")
        setDisplayColorPicker(true);
    };

    const style = {
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "fit-content" }}>
                <Button onClick={() => handleClick()}>{props.text}</Button>
                {displayColorPicker ? <div style={style.popover}>
                    <div style={{ zIndex: 10 }}>
                        <BlockPicker
                            colors={props.colors}
                            triangle={props.triangle}
                            color={props.templateColor || props.colors[0]}
                            onChangeComplete={props.onChangeComplete}
                            style={{ zIndex: 10 }} />
                    </div>
                </div> : null}
            </div>
            <div style={{ width: "auto", backgroundColor: props.templateColor || "#000000", background: "rgb(183, 142, 75)", height: "22px", width: "22px", position: "relative", border: ".5px solid black", float: "left", margin: "auto", borderRadius: "4px" }}>
            </div>
        </div >
    )
}

export default ButtonColorPicker