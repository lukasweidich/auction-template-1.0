import React from "react"

//todo: enter props prefix before properties
const dem_it_yellow = (props) => {
    return (<div id="template">
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
                                {variations ?
                                    <div>
                                        <hr />
                                        {variations.map(el => {
                                            return <div>
                                                <h3 class="template-variation-headline">{el.name}</h3>
                                                <div class="template-variation-inline">
                                                    {el.value.map(el => {
                                                        return <div class="template-variation">
                                                            <span>{el}</span>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    : null}
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

export default dem_it_yellow;