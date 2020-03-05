import React, {useState} from "react"

const Combobox = (props) => {

const [selectedElement, setSelectedElement] = new useState("");

const onChangeHandler = (event) =>{
    setSelectedElement(event.target.value)
}

    return (
        <span>
        <select onChange={onChangeHandler} defaultValue={-1}>
        <option value={-1}>Bitte ein Produkt auswählen...</option>
            {
                props.items.sort().map((item, i) => {
                    return <option key={i} value={item.value}>{item.value} - {item.text}</option>
                })
            }
        </select>
        
        {selectedElement > 0
        ?
            (<button onClick={() => console.log(selectedElement)}>Auswählen</button>)
            :
            (<button disabled={true} onClick={() => console.log(selectedElement)}>Auswählen</button>)
        }
            </span>
    )
}



export default Combobox