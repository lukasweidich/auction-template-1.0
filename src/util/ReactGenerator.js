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
    const title = <h1>{props.item.title}</h1>;
    const price_value = <span>{props.item.price.convertedFromValue}</span>;
    const price_currency = <span>{props.item.price.convertedFromCurrency}</span>
    const price = <p>{price_value} {price_currency}</p>
    const description = <p>{props.item.shortDescription}</p>
    const images = [props.item.image, ...props.item.additionalImages]
    const localizedAspects = props.item.localizedAspects.map((aspect, i) => <li key={i}><span style={style.boldText}>{aspect.name}: </span><span>{aspect.value}</span></li>);
    const seller = props.item.seller;

    return (
        <body>
            <meta charset="utf-8" />
            <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slideshow.css" />
            <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template_1.css" />
            <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
            <div class="nav">
                <input type="checkbox" id="nav-check" />
                <div class="nav-header">
                    <div class="nav-title"> {seller.username} </div>
                </div>
                <div class="nav-btn">
                    <label for="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div class="nav-links">
                    <a href={`https://www.ebay.de/usr/${seller.username}`} target="_blank">Shop</a>
                    <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller.username}`} target="_blank">Bewertungen</a>
                    <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller.username}`} target="_blank">Kontakt</a>
                </div>
            </div>
            <div class="body-wrap">
                <center>
                    <div class="elem">
                        <h2 id="title">{title}</h2>
                    </div>
                    <div id="wrapper">
                        <div class="slider">
                            {images.map((image, i) => {
                                return (<input type="radio" name="slider" id={`slide${i}`} selected="false" />)
                            })}
                            <div class="slides">
                                {images.map((image, i) => {
                                    return (<div class="slide">
                                        <img style={{ objectFit: "scale-down" }} height="400" width="600" src={image.imageUrl} />
                                    </div>)
                                })}
                            </div>
                            <div class="navslider">
                                {images.map((image, i) => {
                                    return <label class="bottom" for={`slide${i}`}></label>
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="column-wrapper-small elem">
                        <div class="column-small">
                            <h2>{price}</h2>
                        </div>
                    </div>
                </center>
            </div>
            <div class="column less-top-padding">
                {props.item.shortDescription !== null ?
                    <div class="elem">
                        <h2 id="highlights">Beschreibung</h2>
                        {description}
                    </div>
                    : null
                }
                {props.item.localizedAspects.length > 0 ?
                    <div class="elem">
                        <h2 id="highlights">Highlights</h2>
                        {localizedAspects}
                    </div>
                    : null
                }
            </div>
        </body >
    );
}

export default createReactFromItem