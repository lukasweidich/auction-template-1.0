import React, { useState } from "react";
const Editable = (props) => {
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

    const style = {
        input: {
            width: "auto"
        },
        textarea: {
            wrap: "hard"
        },
        button: {
            width: "auto"
        }
    }

    return (
        isEditing
            ?
            initialValue.length > 20
                ?
                <span>
                    <textarea style={style.textarea} onKeyUp={keyUpHandler.bind(this)} onChange={inputChangeHandler} value={currentValue} />
                    <button style={style.button} onClick={rejectChangesHandler}>Abbrechen</button>
                    <button style={style.button} onClick={acceptChangesHandler}>Bestätigen</button>
                </span>
                :
                <span>
                    <input style={style.input} onKeyUp={keyUpHandler.bind(this)} onChange={inputChangeHandler} value={currentValue} />
                    <button style={style.button} onClick={rejectChangesHandler}>Abbrechen</button>
                    <button style={style.button} onClick={acceptChangesHandler}>Bestätigen</button>
                </span>

            :
            <span onClick={editOnClickHandler}>{React.cloneElement(props.children, [], currentValue || props.children.props.children)}</span>
    )
}

export default Editable