import React from "react"

const Editable = (props) => {
    console.log(props.children)
    return (
        <div onClick={() => console.log("clicked")}>
            {<ul>
            {props.children.length && props.children.map((child)=>{
                return <li>{child}</li>
            })}
            </ul>}
        </div>
    )
}

export default Editable