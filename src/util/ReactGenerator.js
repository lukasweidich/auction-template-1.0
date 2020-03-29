import React from "react"

const createReactFromItem = (props) => {
    const title = props.item.Title._text;
    const price_value = props.item.CurrentPrice._text
    const price_currency = props.item.CurrentPrice._attributes.currencyID
    const price = price_value + price_currency
    const description = props.item.Description._text
    const images = Array.isArray(props.item.PictureURL) ? [...props.item.PictureURL.map(el => el._text)] : [props.item.PictureURL._text]
    const localizedAspects = Array.isArray(props.item.ItemSpecifics.NameValueList) ?
        props.item.ItemSpecifics.NameValueList.map(el => el = { name: el.Name._text, value: el.Value._text === "" ? el.Value._text : el.Value._text || el.Value.map(el => el._text).join(", ") })
        :
        (props.item.ItemSpecifics.NameValueList ?
            [{ name: props.item.ItemSpecifics.NameValueList.Name._text, value: props.item.ItemSpecifics.NameValueList.Value._text }].map(el => el)
            : null)
    const seller = props.item.Seller.UserID._text;
    const paymentOptions = props.articleOptions.paymentOptions.filter(el => el.selected);
    const shippingOptions = props.articleOptions.shippingOptions.filter(el => el.selected);
    const shipping = props.item.ShippingCostSummary.ShippingServiceCost._text
    const legalInformation = props.articleOptions.legalInformation;
    const id = props.item.ItemID._text;

    if (props.templateId === "dem-it-classic") {
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
                            <div class="template-nav-title"> {seller} </div>
                        </div>
                        <div class="template-nav-btn">
                            <label for="template-nav-check">
                                <span></span>
                                <span></span>
                                <span></span>
                            </label>
                        </div>
                        <div class="template-nav-links">
                            <a href={`https://www.ebay.de/usr/${seller}`} rel="noopener noreferrer" target="_blank">Unser Shop</a>
                            <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} rel="noopener noreferrer" target="_blank">Bewertungen</a>
                            <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller}`} rel="noopener noreferrer" target="_blank">Kontakt</a>
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
                                                            <img alt={`Article #${i}`} style={{ objectFit: "scale-down" }} height="400" width="600" src={image} />
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
                                            <h3 id="template-shipping-cost">+{shipping}{price_currency} Versandkosten</h3>
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
                                            <ul id="template-aspects">
                                                {localizedAspects.map((aspect, i) => {
                                                    return <li><span style={{ fontWeight: 700 }}>{aspect.name}:</span> {aspect.value}</li>
                                                })}
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
                            </div>
                            <div class="template-column-wrapper template-column-wrapper-tablet template-flex-start">
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
    } else if (props.templateId === "nüscht") {
        return (
            <h1>lol anderes template</h1>
        )
    } else if (props.templateId === "dem-it-yellow") {
        return (
            <div id="template">
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" href="https://dem-it.de/uploads/template.css" />
                <link rel="stylesheet" href="https://dem-it.de/uploads/bootstrap.css" />
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/fontawesome.min.css" /> */}

                <div class="template-nav">
                    <input type="checkbox" id="template-nav-check" />
                    <div class="template-nav-header">
                        <div class="template-nav-title"> {seller} </div>
                    </div>
                    <div class="template-nav-btn">
                        <label for="template-nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <div class="template-nav-links">
                        <a href={`https://www.ebay.de/usr/${seller}`} target="_blank">Unser Shop</a>
                        <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} target="_blank">Bewertungen</a>
                        <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller}`} target="_blank">Kontakt</a>
                    </div>
                </div>
                <div id="layout__layout-4">
                    <div class="row">
                        <div class="col col-md-6">
                            <div id="layout__gallery">
                                <div>
                                    <div>
                                        <div class="content__gallery content__gallery--flex-column content__gallery--right ">
                                            {images.map((el, i) => {
                                                return (<div class={`thumb__float thumb${i + 1}`} id={`template-thumb${i + 1}`}>
                                                    <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src={el} /></div>
                                                </div>)
                                            })}
                                            <div class="slider__wrapper">
                                                <div class="slider">
                                                    {images.map((el, i) => {
                                                        return (<div style={{ backgroundImage: `url(${el})` }}></div>)
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-6">
                            <div id="layout__content">
                                <div class="row flex direction-column">
                                    <div class="col col-md-12 order-1">
                                        <div class="content__description mb0">
                                            <h2 id="template-title">{title}</h2>
                                            <hr />
                                            <p id="template-description">{description}</p>
                                        </div>
                                    </div>
                                    <div class="col col-md-12 order-2">
                                        <div class="content__bulletpoints">
                                            <ul style={{ listStyleType: "none" }} class="bulletpoints__list" id="template-aspects">
                                                {localizedAspects.map((el) => {
                                                    return <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style={{ fontWeight: 700 }}>{el.name}: </span>{el.value}</li>
                                                })}
                                            </ul>
                                        </div>
                                        <div class="template-column-wrapper">
                                            <div class="template-column-50 template-price-container">
                                                <h1 id="template-price">{price_value}</h1>
                                                <h1 id="template-currency">{price_currency}</h1>
                                            </div>
                                            <div class="template-column-50">
                                                <a href={`https://offer.ebay.de/ws/eBayISAPI.dll?BinConfirm&item=${id}`} ><button class="btn">Sofort kaufen<i style={{ paddingLeft: "10px" }} class="fa fa-shopping-bag"></i></button></a>
                                            </div>
                                        </div>
                                        <div class="template-shipping-container">
                                            <h3 id="template-shipping">+ {shipping}</h3>
                                            <h3 id="template-shipping-currency" style={{ paddingLeft: "2px" }}>{price_currency}</h3>
                                            <h3 style={{ padding: "0px 10px 0px 5px" }}>Versandkosten</h3>
                                        </div>
                                        <div class="template-shipping-icons">
                                            {shippingOptions.map(el => {
                                                return <img src={el.img} />
                                            })}
                                        </div>
                                        {paymentOptions.length > 0 ?
                                            <div>
                                                <hr />
                                                <h3 id="template-payment-methods">Bezahlmethoden</h3>
                                                <div class="template-payment-icons">
                                                    {paymentOptions.map(el => {
                                                        return <img src={el.img} />
                                                    })}
                                                </div>
                                            </div>
                                            : null
                                        }
                                        {legalInformation ?
                                            <div>
                                                <hr />
                                                <h3 id="template-legal-info">Rechtliche Informationen</h3>
                                                <p id="template-legal-info-text">{legalInformation}</p>
                                            </div>
                                            : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    else {
        return (
            <h1>es wurde kein template ausgewählt</h1>
        )
    }
}

export default createReactFromItem