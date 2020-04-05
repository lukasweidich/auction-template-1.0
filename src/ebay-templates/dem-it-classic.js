import React from "react"

const dem_it_classic = (props) => {
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

    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" type="text/css" href="https://dem-it.de/uploads/free.css" />
                <link rel="stylesheet" href="https://dem-it.de/uploads/bootstrap.css" />
            </head>
            <body >
                <div id="template" style={{ ...style.secondary }}>
                    <div style={{ ...style.title, ...style.primary }} class="template-nav"> <input type="checkbox" id="template-nav-check" />
                        <div class="template-nav-header">
                            <div class="template-nav-title" style={style.title}> {seller} </div>
                        </div>
                        <div class="template-nav-btn"><label for="template-nav-check"><span></span><span></span><span></span></label></div>
                        <div class="template-nav-links">
                            <a href={`https://www.ebay.de/usr/${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Unser Shop</a>
                            <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Bewertungen</a>
                            <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Kontakt</a>
                        </div>
                    </div>
                    <div id="layout__layout-4">
                        <div class="row">
                            <div class="col col-md-6">
                                <center>
                                    <img src={images[0]} />
                                </center>
                            </div>
                            <div class="col col-md-6">
                                <h2 id="template-title" style={style.text}>{title}</h2>
                                <hr style={{ backgroundColor: secondaryColor }} />
                                <p id="template-description" style={style.text}>{description}</p>
                                <hr style={{ backgroundColor: secondaryColor }} />
                                <h1 id="template-price" style={{ margin: "0", ...style.text }}>{price}</h1>
                                <h3 id="template-shipping" style={{ margin: "0", ...style.text }}>+ {shipping}€ Versandkosten</h3>
                            </div>
                        </div>
                    </div>
                    <div class="template-space"></div>
                    <div class="template-footer" style={style.primary}>
                        <h2 style={{ color: "#FFF", fontWeight: "400", fontSize: "1.25em", padding: "10px", ...style.title }} > free template powered by <a href="https://www.ebay.de/usr/dem-it" style={{ color: "#FFF", ...style.title }}>template-builder.de</a></h2>
                    </div>
                </div>
            </body >
        </html >
    )

    //     <html style={{ width: "100%" }}>
    //         <head>
    //             <meta charset="utf-8" />
    //             <meta name="viewport" content="width=device-width, initial-scale=1" />
    //             <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template.css" />
    //             <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
    //             <title>DemIT eBay Description Generator</title>
    //         </head>
    // <body style={{ ...style.secondary }} id="template-body" >
    //     <div style={{ ...style.title, ...style.primary }} class="template-nav"> <input type="checkbox" id="template-nav-check" />
    //                 <div class="template-nav-header">
    //                     <div class="template-nav-title" style={style.title}> {seller} </div>
    //                 </div>
    //                 <div class="template-nav-btn">
    //                     <label for="template-nav-check">
    //                         <span></span>
    //                         <span></span>
    //                         <span></span>
    //                     </label>
    //                 </div>
    // <div class="template-nav-links">
    //     <a href={`https://www.ebay.de/usr/${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Unser Shop</a>
    //     <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Bewertungen</a>
    //     <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&requested=${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Kontakt</a>
    // </div>
    //             </div>
    //             <div class="template-wrapper">
    //                 <div class="template-wrap">
    //                     <div class="template-column-wrapper">
    //                         <div class="template-column-50 template-width-auto">
    //                             <div class="template-image-gallery">
    //                                 <div id="template-slider-wrapper">
    //                                     <div style={style.secondary} class="template-slider">
    //                                         {images.map((image, i) => {
    //                                             return (<input type="radio" name="slider" id={`template-slide${i}`} class="template-slide-count" selected="false" />)
    //                                         })}
    //                                         <div class="template-slides">
    //                                             {images.map((image, i) => {
    //                                                 return (<div class="template-slide">
    //                                                     <img alt={`Article #${i}`} style={{ objectFit: "scale-down" }} height="400" width="600" src={image} />
    //                                                 </div>)
    //                                             })}
    //                                         </div>
    //                                         <div class="template-navslider">
    //                                             {images.map((image, i) => {
    //                                                 return <label class="template-bottom" for={`template-slide${i}`}></label>
    //                                             })}
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div class="template-column-50">
    //                             <div class="template-container template-container-tablet-center">
    //                                 <h1 style={style.text} id="template-title">{title}</h1>
    //                                 <div class="template-simple-divider"></div>
    //                                 <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
    //                                     <h1 style={style.text} id="template-price">{price}</h1>
    //                                     <h3 style={style.text} id="template-shipping-cost">+{shipping}{price_currency} Versandkosten</h3>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div class="template-space"></div>
    //                     {!description && localizedAspects.length === 0 ?
    //                         null :
    //                         <div class="template-simple-divider template-display-mobile-none"></div>
    //                     }
    //                     <div class="template-column-wrapper template-column-wrapper-tablet template-flex-start">
    //                         {localizedAspects.length > 0 ?
    //                             <div class="template-column-50">
    //                                 <div class="template-container">
    //                                     <h1 style={style.text}>Eigenschaften</h1>
    //                                     <ul id="template-aspects">
    //                                         {localizedAspects.map((aspect, i) => {
    //                                             return <li style={style.text}><span style={{ fontWeight: 700 }}>{aspect.name}:</span> {aspect.value}</li>
    //                                         })}
    //                                     </ul>
    //                                 </div>
    //                             </div>
    //                             :
    //                             null
    //                         }
    //                         {description ?
    //                             <div class="template-column-50">
    //                                 <div class="template-container">
    //                                     <h1 style={style.text}>Beschreibung</h1>
    //                                     <p style={style.text} id="template-description">{description}</p>
    //                                 </div>
    //                             </div>
    //                             :
    //                             null
    //                         }
    //                     </div>

    //                     {paymentOptions.length === 0 && shippingOptions.length === 0 ?
    //                         null
    //                         :
    //                         <div class="template-simple-divider template-display-mobile-none"></div>
    //                     }
    //                     <div class="template-column-wrapper template-column-wrapper-tablet template-flex-start">
    //                         {paymentOptions.length > 0 ?
    //                             <div class="template-column-50">
    //                                 <div class="template-container">
    //                                     <h1 style={style.text}>Bezahlmethoden</h1>
    //                                     <div class="template-information-container">
    //                                         {paymentOptions.map((el, i) => {
    //                                             return <img alt={`Payment Option #${i}`} src={el.img} />
    //                                         })}
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             :
    //                             null
    //                         }

    //                         {shippingOptions.length > 0 ?
    //                             <div class="template-column-50">
    //                                 <div class="template-container">
    //                                     <h1 style={style.text}>Versandmethoden</h1>
    //                                     <div class="template-information-container">
    //                                         {shippingOptions.map((el, i) => {
    //                                             return <img alt={`Payment Option #${i}`} src={el.img} />
    //                                         })}
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             :
    //                             null
    //                         }
    //                     </div>
    //                     <div class="template-column-wrapper template-column-wrapper-tablet template-flex-start">
    //                         {legalInformation ?
    //                             <div>
    //                                 <div class="template-simple-divider template-display-mobile-none"></div>
    //                                 <div class="template-column-50">
    //                                     <div class="template-container">
    //                                         <h1 style={style.text}>Rechtliche Angaben</h1>
    //                                         <div class="template-information-container">
    //                                             <p style={style.text} id="template-description">{legalInformation}</p>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             :
    //                             null
    //                         }

    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="template-space"></div>
    //             <div style={{ ...style.title, ...style.primary }} class="template-footer"></div>
    //         </body>
    //     </html >
    // )
}
export default dem_it_classic;