import React from "react"

const dem_it_yellow = (props) => {
    const { primary: primaryColor, secondary: secondaryColor, title: titleColor, text: textColor } = props.colors;

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
    const variations = props.item.Variations ? props.item.Variations.VariationSpecificsSet.NameValueList.map(el => el = { name: el.Name._text, value: el.Value.map(el => el._text) }) : null;

    const style = {
        title: {
            color: titleColor
        },
        text: {
            color: textColor
        },
        primary: {
            backgroundColor: primaryColor
        },
        secondary: {
            backgroundColor: secondaryColor
        }
    }

    return (<div id="template">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://dem-it.de/uploads/template.css" />
        <link rel="stylesheet" href="https://dem-it.de/uploads/bootstrap.css" />
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/fontawesome.min.css" /> */}

        <div style={{ ...style.title, ...style.primary }} class="template-nav" >
            <input type="checkbox" id="template-nav-check" />
            <div class="template-nav-header">
                <div class="template-nav-title" style={style.title}> {seller} </div>
            </div>
            <div class="template-nav-btn">
                <label for="template-nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <div class="template-nav-links">
                <a href={`https://www.ebay.de/usr/${seller}`} target="_blank" style={style.title}>Unser Shop</a>
                <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} target="_blank" style={style.title}>Bewertungen</a>
                <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller}`} target="_blank" style={style.title}>Kontakt</a>
            </div>
        </div>
        <div style={{ ...style.secondary }} id="layout__layout-4">
            <div class="row">
                <div class="col col-md-6">
                    <div id="layout__gallery">
                        <div>
                            <div>
                                <div style={style.secondary} class="content__gallery content__gallery--flex-column content__gallery--right ">
                                    {images.map((el, i) => {
                                        return (<div style={{ border: `1px solid ${primaryColor}` }} class={`thumb__float thumb${i + 1}`} id={`template-thumb${i + 1}`}>
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src={el} /></div>
                                        </div>)
                                    })}
                                    <div class="slider__wrapper">
                                        <div class="slider">
                                            {images.map((el, i) => {
                                                return (<div style={{ backgroundImage: `url(${el})`, backgroundColor: secondaryColor }}></div>)
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
                                    <h2 style={style.text} id="template-title">{title}</h2>
                                    <hr style={{ backgroundColor: secondaryColor }} />
                                    <p style={style.text} id="template-description">{description}</p>
                                </div>
                            </div>
                            <div class="col col-md-12 order-2">
                                <div class="content__bulletpoints">
                                    <ul style={{ listStyleType: "none" }} class="bulletpoints__list" id="template-aspects">
                                        {localizedAspects.map((el) => {
                                            return <li style={style.text} class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style={{ fontWeight: 700 }}>{el.name}: </span>{el.value}</li>
                                        })}
                                    </ul>
                                </div>
                                {variations ?
                                    <div>
                                        <hr style={{ backgroundColor: secondaryColor }} />
                                        {variations.map(el => {
                                            return <div>
                                                <h3 style={style.text} class="template-variation-headline">{el.name}</h3>
                                                <div class="template-variation-inline">
                                                    {el.value.map(el => {
                                                        return <div class="template-variation">
                                                            <span style={style.text} >{el}</span>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    : null}
                                <div class="template-column-wrapper">
                                    <div style={style.primary} class="template-column-50 template-price-container">
                                        <h1 style={style.title} id="template-price">{price_value}</h1>
                                        <h1 style={style.title} id="template-currency">{price_currency}</h1>
                                    </div>
                                    <div class="template-column-50">
                                        <a href={`https://offer.ebay.de/ws/eBayISAPI.dll?BinConfirm&item=${id}`} ><button style={style.primary} class="btn"><span style={style.title}>Sofort kaufen</span><i style={{ paddingLeft: "10px", ...style.title }} class="fa fa-shopping-bag"></i></button></a>
                                    </div>
                                </div>
                                <div class="template-shipping-container">
                                    <h3 style={style.text} id="template-shipping">+ {shipping}</h3>
                                    <h3 id="template-shipping-currency" style={{ paddingLeft: "2px", ...style.text }}>{price_currency}</h3>
                                    <h3 style={{ padding: "0px 10px 0px 5px", ...style.text }}>Versandkosten</h3>
                                </div>
                                <div class="template-shipping-icons">
                                    {shippingOptions.map(el => {
                                        return <img src={el.img} />
                                    })}
                                </div>
                                {paymentOptions.length > 0 ?
                                    <div>
                                        <hr style={{ backgroundColor: secondaryColor }} />
                                        <h3 style={style.text} id="template-payment-methods">Bezahlmethoden</h3>
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
                                        <hr style={{ backgroundColor: secondaryColor }} />
                                        <h3 style={style.text} id="template-legal-info">Rechtliche Informationen</h3>
                                        <p style={style.text} id="template-legal-info-text">{legalInformation}</p>
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