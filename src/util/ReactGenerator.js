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
    const title = props.item.title;
    const price_value = props.item.price.convertedFromValue
    const price_currency = props.item.price.convertedFromCurrency
    const price = price_value + price_currency
    const description = props.item.shortDescription
    const images = [props.item.image, ...props.item.additionalImages]
    const localizedAspects = props.item.localizedAspects.map((aspect, i) => <li key={i}><span style={style.boldText}>{aspect.name}: </span><span>{aspect.value}</span></li>);
    const seller = props.item.seller;
    const paymentOptions = props.articleOptions.paymentOptions.filter(el => el.selected);
    const shippingOptions = props.articleOptions.shippingOptions.filter(el => el.selected);
    const shipping = props.articleOptions.shipping
    const legalInformation = props.articleOptions.legalInformation;

    return (
        <html style={{ width: "100%" }}>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template.css" />
                <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
                <title>DemIT eBay Description Generator</title>
            </head>
            <body id="template-body">
                <div class="template-nav"> <input type="checkbox" id="template-nav-check" />
                    <div class="template-nav-header">
                        <div class="template-nav-title"> {seller.username} </div>
                    </div>
                    <div class="template-nav-btn">
                        <label for="template-nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <div class="template-nav-links">
                        <a href={`https://www.ebay.de/usr/${seller.username}`} rel="noopener noreferrer" target="_blank">Unser Shop</a>
                        <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller.username}`} rel="noopener noreferrer" target="_blank">Bewertungen</a>
                        <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller.username}`} rel="noopener noreferrer" target="_blank">Kontakt</a>
                    </div>
                </div>
                <div class="template-wrapper">
                    <div class="template-wrap">
                        <div class="template-column-wrapper">
                            <div class="template-column-50 template-width-auto">
                                <div class="template-image-gallery">
                                    <div id="template-slider-wrapper">
                                        <div class="template-slider">
                                            {images.map((image, i) => {
                                                return (<input type="radio" name="slider" id={`template-slide${i}`} class="template-slide-count" selected="false" />)
                                            })}
                                            <div class="template-slides">
                                                {images.map((image, i) => {
                                                    return (<div class="template-slide">
                                                        <img alt={`Article #${i}`} style={{ objectFit: "scale-down" }} height="400" width="600" src={image.imageUrl} />
                                                    </div>)
                                                })}
                                            </div>
                                            <div class="template-navslider">
                                                {images.map((image, i) => {
                                                    return <label class="template-bottom" for={`template-slide${i}`}></label>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="template-column-50">
                                <div class="template-container template-container-tablet-center">
                                    <h1 id="template-title">{title}</h1>
                                    <div class="template-simple-divider"></div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                                        <h1 id="template-price">{price}</h1>
                                        {shipping > "0" ?
                                            <h3 id="template-shipping-cost">+{shipping}{price_currency} Versandkosten</h3>
                                            :
                                            <h3 id="template-shipping-cost">kostenloser Versand</h3>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="template-space"></div>
                        {!description && localizedAspects.length === 0 ?
                            null :
                            <div class="template-simple-divider template-display-mobile-none"></div>
                        }
                        <div class="template-column-wrapper template-column-wrapper-tablet template-flex-start">
                            {localizedAspects.length > 0 ?
                                <div class="template-column-50">
                                    <div class="template-container">
                                        <h1>Eigenschaften</h1>
                                        <ul style={style.listWithoutDots} id="template-aspects">
                                            {localizedAspects}
                                        </ul>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {description ?
                                <div class="template-column-50">
                                    <div class="template-container">
                                        <h1>Beschreibung</h1>
                                        <p id="template-description">{description}</p>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>

                        {paymentOptions.length === 0 && shippingOptions.length === 0 ?
                            null
                            :
                            <div class="template-simple-divider template-display-mobile-none"></div>
                        }
                        <div class="template-column-wrapper template-column-wrapper-tablet template-flex-start">
                            {paymentOptions.length > 0 ?
                                <div class="template-column-50">
                                    <div class="template-container">
                                        <h1>Bezahlmethoden</h1>
                                        <div class="template-information-container">
                                            {paymentOptions.map((el, i) => {
                                                return <img alt={`Payment Option #${i}`} src={el.img} />
                                            })}
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }

                            {shippingOptions.length > 0 ?
                                <div class="template-column-50">
                                    <div class="template-container">
                                        <h1>Versandmethoden</h1>
                                        <div class="template-information-container">
                                            {shippingOptions.map((el, i) => {
                                                return <img alt={`Payment Option #${i}`} src={el.img} />
                                            })}
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {legalInformation ?
                                <div>
                                    <div class="template-simple-divider template-display-mobile-none"></div>
                                    <div class="template-column-50">
                                        <div class="template-container">
                                            <h1>Rechtliche Angaben</h1>
                                            <div class="template-information-container">
                                                <p id="template-description">{legalInformation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }

                        </div>
                    </div>
                </div>
                <div class="template-space"></div>
                <div class="template-footer"></div>
            </body>
        </html>
    )
}

export default createReactFromItem