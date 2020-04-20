import React from "react"

const comp = (props) => {
    return (
        <div {...props}>
            {
                Array.isArray(props.children) ?
                    props.children.map(child => {
                        return (
                            <div style={{ margin: "2em" }}>
                                {child}
                            </div>
                        )
                    })
                    :
                    <div style={{ margin: "2em" }}>
                        {props.children}
                    </div>
            }
        </div>
    )
}

export default comp;