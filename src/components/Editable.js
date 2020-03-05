import React, { useState } from "react";

const MyEditable = (props) => {
    const KEYCODE_ENTER = 13;
    const KEYCODE_ESC = 27;
    const [isEditing, setEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState("");
    const [initialValue, setInitialValue] = useState("");

    const inputChangeHandler = event => {
        setCurrentValue(event.target.value);
    }

    const acceptChangesHandler = () => {
        setEditing(false);
    }

    const rejectChangesHandler = () => {
        setCurrentValue(initialValue)
        setEditing(false);
    }

    const editOnClickHandler = () => {
        setEditing(true);
        setInitialValue(currentValue || props.children.props.children);
        setCurrentValue(currentValue || props.children.props.children);
    }

    const keyUpHandler = (event) => {
        var code = event.keyCode || event.which;
        
        if (code === KEYCODE_ENTER) {
            acceptChangesHandler();
        }
        
        if (code === KEYCODE_ESC) {
            rejectChangesHandler();
        }
    }

    return (            
                isEditing
                    ?
                    <input style={{width:"300"}} onKeyUp={keyUpHandler.bind(this)} onBlur={acceptChangesHandler} onChange={inputChangeHandler} value={currentValue} />
                    :
                    <span onClick={editOnClickHandler}>{React.cloneElement(props.children, [], currentValue || props.children.props.children)}</span> 
    )
}

export default MyEditable