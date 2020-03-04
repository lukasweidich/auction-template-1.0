import React from "react"
import Editable from '../components/Editable';

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
    const title = <Editable><h1>{props.item.title}</h1></Editable>;
    const price_value = <Editable><span>{props.item.price.convertedFromValue}</span></Editable>;
    const price_currency = <Editable><span>{props.item.price.convertedFromCurrency}</span></Editable>
    const price = <p>{price_value} {price_currency}</p>
    const description = <Editable><p>{props.item.shortDescription}</p></Editable>
    const image = <img style={style.img} src={props.item.image.imageUrl} alt="" />;
    const additionalImages = props.item.additionalImages.map((image, i) => <li key={i}><img style={style.additionalImg} src={image.imageUrl} alt="" /></li>);
    const localizedAspects = props.item.localizedAspects.map((aspect, i) => <li key={i}><span style={style.boldText}>{aspect.name}:</span> <Editable><span>{aspect.value}</span></Editable></li>);

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
                <div>
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