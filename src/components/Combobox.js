import React from "react"

const Combobox = (props) => {
    return (
        <select>
            {
                props.items.map((item, i) => {
                    return <option key={i} value={item.value}>{item.text}</option>
                })
            }
        </select>
    )
}



export default Combobox