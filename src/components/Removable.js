import React, { useState } from "react";

const Removable = (props) => {
    const [isEditing, setEditing] = useState(false);
    const [isDeleted, setDeleted] = useState(false);


    const acceptChangesHandler = () => {
        setDeleted(true)
        setEditing(false);
    }

    const rejectChangesHandler = () => {
        setEditing(false);
    }

    const editOnClickHandler = () => {
        setEditing(!isEditing);
    }

    return (
        isDeleted
            ?
            <p></p>
            :
            (isEditing
                ?
                <span style={{ padding: "5px", border: "1px solid red" }}>
                    <span onClick={editOnClickHandler}>{props.children}</span>
                    <span style={{ padding: "2px" }}>
                        <button onClick={rejectChangesHandler}>Abbrechen</button>
                        <button onClick={acceptChangesHandler}>Löschen</button>
                    </span>
                </span >
                :
                <span onClick={editOnClickHandler}>{props.children}</span>)
    )
}

export default Removable