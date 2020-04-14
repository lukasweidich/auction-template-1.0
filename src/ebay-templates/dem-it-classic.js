import React from "react"

const dem_it_classic = (props) => {
    const { primary: primaryColor, secondary: secondaryColor, title: titleColor, text: textColor } = props.colors;
    const title = props.item.Title._text;
    const price_value = props.item.CurrentPrice._text
    const price_currency = props.item.CurrentPrice._attributes.currencyID
    const price = price_value + price_currency
    const description = props.item.Description._text
    const images = Array.isArray(props.item.PictureURL) ? [...props.item.PictureURL.map(el => el._text)] : [props.item.PictureURL._text]
    const sellerDisplay = props.articleOptions.sellerName || props.item.Seller.UserID._text
    const seller = props.item.Seller.UserID._text
    const shipping = props.item.ShippingCostSummary.ShippingServiceCost._text
    const id = props.item.ItemID._text;

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
        <div>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" type="text/css" href="https://dem-it.de/uploads/free.css" />
            <link rel="stylesheet" href="https://dem-it.de/uploads/bootstrap.css" />
            <div id="template" style={{ ...style.secondary }}>
                <div style={{ ...style.title, ...style.primary }} className="template-nav"> <input type="checkbox" id="template-nav-check" />
                    <div className="template-nav-header">
                        <div className="template-nav-title" style={style.title}> {sellerDisplay} </div>
                    </div>
                    <div className="template-nav-btn">
                        <label htmlFor="template-nav-check">
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>
                    </div>
                    <div className="template-nav-links">
                        <a href={`https://www.ebay.de/usr/${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Shop</a>
                        <a href={` https://www.ebay.de/sch/${seller}/m.html?_nkw=&_armrs=1&_ipg=&_from=`} rel="noopener noreferrer" target="_blank" style={style.title}>Artikel</a>
                        <a href={`https://www.ebay.de/fdbk/feedback_profile/${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Bewertungen</a>
                        <a href={`https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&iid=${id}&requested=${seller}`} rel="noopener noreferrer" target="_blank" style={style.title}>Kontakt</a>
                    </div>
                </div>
                <div id="layout__layout-4">
                    <div className="row">
                        <div className="col col-md-6">
                            <center>
                                <img alt={`${sellerDisplay}: ${title}`} src={images[0]} />
                            </center>
                        </div>
                        <div className="col col-md-6">
                            <h2 id="template-title" style={style.text}>{title}</h2>
                            <hr style={{ backgroundColor: secondaryColor }} />
                            <p id="template-description" style={style.text}>{description}</p>
                            <hr style={{ backgroundColor: secondaryColor }} />
                            <h1 id="template-price" style={{ margin: "0", ...style.text }}>{price}</h1>
                            <h3 id="template-shipping" style={{ margin: "0", ...style.text }}>+ {shipping}{price_currency} Versandkosten</h3>
                        </div>
                    </div>
                </div>
                <div className="template-space"></div>
                <div className="template-footer" style={style.primary}>
                    <h2 style={{ color: "#FFF", fontWeight: "400", fontSize: "1.25em", padding: "10px", ...style.title }} > free template powered by <a href="https://www.ebay.de/usr/dem-it" style={{ color: "#FFF", ...style.title }}>template-builder.de</a></h2>
                </div>
            </div>
        </div >
    )
}
export default dem_it_classic;
