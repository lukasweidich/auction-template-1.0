import React from "react";

const TemplateDetail = (props) => {
    console.log(props)
    return (
        <main style={{ width: "100vw", paddingTop: "-64px" }} class="container">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: "-64px" }}>
                <div style={{ width: "50%" }}>
                    <img class="active" src={props.img} alt="" />
                </div>
                <div style={{ width: "50%" }}>
                    <div class="product-description">
                        <h1>{props.title}</h1>
                        <div class="product-price">
                            <span>{props.price} {props.currency}</span>
                        </div>
                        <p>{props.description}</p>
                    </div>
                    {props.children}
                </div>
            </div>
        </main>
    )
}

export default TemplateDetail;