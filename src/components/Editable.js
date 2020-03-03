import React, { useState } from "react";

const MyEditable = (props) => {
    const KEYCODE_ENTER = 13;
    const KEYCODE_ESC = 27;
    const [isEditing, setEditing] = useState(false);
    const [value, setValue] = useState("");

    const inputChangeHandler = event => {
        setValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setEditing(false);
    }

    const divOnClickHandler = () => {
        setEditing(!isEditing);
        setValue(value || props.children.props.children);
    }

    const keyUpHandler = (event) => {
        var code = event.keyCode || event.which;
        if (code === KEYCODE_ENTER || code === KEYCODE_ESC) {
            inputBlurHandler();
        }
    }

    return (
        <div>
            {
                isEditing
                    ?
                    <div><input onKeyUp={keyUpHandler.bind(this)} onBlur={inputBlurHandler} onChange={inputChangeHandler} value={value} /></div>
                    :
                    <div onClick={divOnClickHandler}>{React.cloneElement(props.children, [], value || props.children.props.children)}</div>
            }
        </div>
    )
}
export default MyEditable