import React from "react"
import "./kuststorm.css"

const kuststorm = (props) => {
    const { primary: primaryColor, secondary: secondaryColor, title: titleColor, text: textColor } = props.colors;
    const title = props.item.Title._text;
    const price_value = props.item.CurrentPrice._text
    const price_currency = props.item.CurrentPrice._attributes.currencyID
    const description = props.item.Description._text ? props.item.Description._text.replace(/(?:\r\n|\r|\n)/g, '<br>') : null;
    const images = Array.isArray(props.item.PictureURL) ? [...props.item.PictureURL.map(el => el._text)] : [props.item.PictureURL._text]
    const localizedAspects = props.allAspects;
    const sellerDisplay = props.articleOptions.sellerName || props.item.Seller.UserID._text
    const seller = props.item.Seller.UserID._text
    const paymentOptions = props.articleOptions.paymentOptions.filter(el => el.selected);
    const shippingOptions = props.articleOptions.shippingOptions.filter(el => el.selected);
    const shipping = props.item.ShippingCostSummary.ShippingServiceCost._text
    const id = props.item.ItemID._text;
    const variations = props.item.Variations ? props.item.Variations.VariationSpecificsSet.NameValueList.map(el => el = { name: el.Name._text, value: el.Value.map(el => el._text) }) : null;
    const additionalTexts = props.articleOptions.additionalTexts.map(el => el = { ...el, content: el.content.replace(/(?:\r\n|\r|\n)/g, '<br>') });

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

    const displayAdditionalTexts = Array.isArray(additionalTexts) && additionalTexts.length > 0;
    const displayPaymentOptions = Array.isArray(paymentOptions) && paymentOptions.length > 0;
    const displayShippingOptions = Array.isArray(shippingOptions) && shippingOptions.length > 0;
    const displayLocalizedAspects = Array.isArray(localizedAspects) && localizedAspects.length > 0;
    const diplayPaymentOrShipping = displayPaymentOptions || displayShippingOptions;
    const displayVariations = Array.isArray(variations) && variations.length > 0;

    return (
        <div id="template">
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://dem-it.de/auction-template/kuststorm/kuststorm.css" />
            <nav class="template-hamburger">
                <input type="checkbox" id="template-burgerbutton" />
                <label for="template-burgerbutton" class="template-burgerimage" title="Navigation">&#x2630;</label>
                <ul>
                    <li><a class="template-hamburger-links" href={`https://www.ebay.de/usr/${seller}`} title="Link">Verkäuferprofil</a></li>
                    <li><a class="template-hamburger-links" href={`https://www.ebay.de/sch/${seller}/m.html?_nkw=&_armrs=1&_ipg=&_from=`} title="Link">Shop</a></li>
                    <li><a class="template-hamburger-links" href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} title="Link">Bewertungen</a></li>
                    <li><a class="template-hamburger-links" href={`https://my.ebay.de/ws/eBayISAPI.dll?AcceptSavedSeller&mode=0&preference=0&ssPageName=STRK:MEFS:ADDMP&sellerid=${seller}`} title="Link">Shop speichern</a></li>
                    <li><a class="template-hamburger-links" href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&iid=${id}&requested=${seller}`} title="Link">Kontakt</a></li>
                    <li><a href={`https://www.ebay.de/usr/${seller}`}><h2>{sellerDisplay}</h2></a></li>
                </ul>
            </nav>
            <div class="template-navbar">
                <div id="template-logo">
                    <h2>{sellerDisplay}</h2>
                </div>
                <div class="template-links">
                    <a href={`https://www.ebay.de/usr/${seller}`}>Verkäuferprofil</a>
                    <a href={`https://www.ebay.de/sch/${seller}/m.html?_nkw=&_armrs=1&_ipg=&_from=`}>Shop</a>
                    <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`}>Bewertungen</a>
                    <a href={`https://my.ebay.de/ws/eBayISAPI.dll?AcceptSavedSeller&mode=0&preference=0&ssPageName=STRK:MEFS:ADDMP&sellerid=${seller}`}>Shop speichern</a>
                    <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&iid=${id}&requested=${seller}`}>Kontakt</a>
                </div>
            </div>
            <div id="layout__layout-4">
                <div class="row">
                    <div class="col col-md-6">
                        <div id="layout__gallery">
                            <div>
                                <div>
                                    <div style={style.secondary} className="content__gallery content__gallery--flex-column content__gallery--right ">
                                        {images.map((el, i) => {
                                            return (<div key={i} style={{ border: `1px solid ${primaryColor}` }} className={`thumb__float thumb${i + 1}`} id={`template-thumb${i + 1}`}>
                                                <div className="thumb__wrapper vertical-align-middle"><span className="vertical-align-helper"></span><img alt={`${sellerDisplay}: ${title} (${i})`} src={el} style={{ maxHeight: "74px" }} /></div>
                                            </div>)
                                        })}
                                        <div className="slider__wrapper">
                                            <div className="slider">
                                                {images.map((el, i) => {
                                                    return (<div key={i} style={{ backgroundImage: `url(${el})`, backgroundColor: secondaryColor }}></div>)
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
                                        <p id="template-description">{<div dangerouslySetInnerHTML={{ __html: description }} />}</p>
                                    </div>
                                </div>

                                <div class="col col-md-12 order-2">
                                    {displayVariations &&
                                        <div>
                                            <hr />
                                            {variations.map((el, i) => {
                                                return <div key={i}>
                                                    <h3 id="template-payment-methods">{el.name}</h3>
                                                    <div class="template-variation-inline">
                                                        {el.value.map((el, i) => {
                                                            return <div key={i} className="template-variation">
                                                                <span>{el}</span>
                                                            </div>
                                                        })}
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    }
                                    <div class="template-price-wrapper">
                                        <div class="template-price-inner">
                                            <div class="template-price-organizer">
                                                <div class="template-price-container">
                                                    <h1 id="template-price">{price_value}{price_currency}</h1>
                                                </div>
                                                <div class="template-shipping">
                                                    {
                                                        (parseFloat(shipping.replace(",", ".")) > 0 ?
                                                            <h4>+ {shipping}{price_currency} Versandkosten</h4>
                                                            :
                                                            <h4>Kostenloser Versand</h4>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div class="template-price-organizer">
                                                <a href={`https://offer.ebay.de/ws/eBayISAPI.dll?BinConfirm&item=${id}`} >
                                                    <button class="template-buy-btn">Sofort kaufen<i style={{ paddingLeft: "10px" }} class="fa fa-shopping-bag"></i>
                                                    </button>
                                                </a>
                                                <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&iid=383410792853&requested=${seller}`} >
                                                    <button class="template-buy-btn">Kontakt<i style={{ paddingLeft: "10px" }} class="fa fa-paper-plane"></i>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(displayLocalizedAspects || (diplayPaymentOrShipping) || displayAdditionalTexts) &&
                    < div class="pc-tab">
                        {displayLocalizedAspects &&
                            <input checked="checked" id="tab1" type="radio" name="pct" />
                        }
                        {(diplayPaymentOrShipping) &&
                            <input id="tab2" type="radio" name="pct" />
                        }
                        {displayAdditionalTexts &&
                            <input id="tab3" type="radio" name="pct" />
                        }
                        <nav>
                            <ul>
                                {displayLocalizedAspects &&
                                    <li class="tab1">
                                        <label for="tab1">Artikelmerkmale</label>
                                    </li>
                                }
                                {(diplayPaymentOrShipping) &&
                                    <li class="tab2">
                                        <label for="tab2">{displayPaymentOptions ? "Bezahlung" : ""}{displayPaymentOptions && displayShippingOptions ? " & " : ""}{displayShippingOptions ? "Versand" : ""}</label>
                                    </li>
                                }
                                {displayAdditionalTexts &&
                                    <li class="tab3">
                                        <label for="tab3">Weitere Informationen</label>
                                    </li>
                                }
                            </ul>
                        </nav>
                        <section>
                            {displayLocalizedAspects &&
                                <div class="tab1">
                                    {localizedAspects.map((el, i) => {
                                        return (
                                            <div key={i} >
                                                <h2>{el.name}</h2>
                                                <ul style={{ listStyleType: "none" }} class="bulletpoints__list" id="template-aspects">
                                                    {el.value.map((el, j) => {
                                                        return <li key={`${i},${j}`} class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style={{ fontWeight: 700 }}>{el.name}: </span>{el.value}</li>
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                            {(diplayPaymentOrShipping) &&
                                <div class="tab2">
                                    {displayShippingOptions &&
                                        <div>
                                            <h2 id="template-payment-methods">Versandmethoden</h2>
                                            <span class="template-shipping-icons">
                                                {shippingOptions.map((el, i) => {
                                                    return <img key={i} alt={`(${el.name})`} src={el.img} />
                                                })}
                                            </span>
                                        </div>
                                    }
                                    {displayPaymentOptions &&
                                        <div>
                                            <h2 id="template-payment-methods">Bezahlmethoden</h2>
                                            <span class="template-payment-icons">
                                                {paymentOptions.map((el, i) => {
                                                    return <img key={i} alt={`(${el.name})`} src={el.img} />
                                                })}
                                            </span>
                                        </div>
                                    }
                                </div>
                            }
                            {displayAdditionalTexts &&
                                <div class="tab3">
                                    {additionalTexts.map(text => {
                                        return <div>
                                            <h2 >{text.headline}</h2>
                                            <p id="template-legal-info-text">{<div dangerouslySetInnerHTML={{ __html: text.content }} />}</p>
                                        </div>
                                    }
                                    )}
                                </div>
                            }
                        </section>
                    </div>
                }
            </div>
        </div >
    )
}

export default kuststorm;