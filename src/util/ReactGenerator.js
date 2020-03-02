import React from "react"

const style = {
    img: {
        height: "100px",
        border: "1px solid red"
    }, additionalImg: {
        height: "50px",
        border: "1px solid red"
    },
    listWithoutDots: {
        listStyleType: "none"
    },
    boldText: {
        fontWeight: 700
    }
}

const createReactFromItem = (props) => {
    // product specific constants
    const title = <h1>{props.item.title}</h1>;
    const price_value = <span>{props.item.price.convertedFromValue}</span>;
    const price_currency = <span>{props.item.price.convertedFromCurrency}</span>
    const price = <p>{price_value} {price_currency}</p>
    const description = <p>{props.item.shortDescription}</p>
    const image = <img style={style.img} src={props.item.image.imageUrl} alt="" />;
    const additionalImages = props.item.additionalImages.map((image, i) => <li key={i}><img style={style.additionalImg} src={image.imageUrl} alt="" /></li>);
    const localizedAspects = props.item.localizedAspects.map((aspect, i) => <li key={i}><span style={style.boldText}>{aspect.name}:</span> {aspect.value}</li>);

    if (props.typus === "test") {
        return (
            <div>
                <p>{props.item.title}</p>
                <div>
                    <span>{props.item.price.value} {props.item.price.currency}</span>
                </div>
                <img maxheight={"100px"} src={props.item.image.imageUrl} alt={"Produktbild"} />
            </div>
        )
    } else if (props.typus === "demIT") {
        return (
            <div>
                {title}
                <div onClick={() => console.log("test")}>
                 {price}
                </div>
                {description}
                {image}
                <ul style={style.listWithoutDots}>{additionalImages}</ul>
                <ul style={style.listWithoutDots}>{localizedAspects}</ul>
            </div>
        );
    }
}

export default createReactFromItem