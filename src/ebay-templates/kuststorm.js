import React from "react"
import "./kuststorm.css"

const kuststorm = (props) => {
    const { primary: primaryColor, secondary: secondaryColor, title: titleColor, text: textColor } = props.colors;
    const title = props.item.Title._text;
    const price_value = props.item.CurrentPrice._text
    const price_currency = props.item.CurrentPrice._attributes.currencyID
    const description = props.item.Description._text.replace(/(?:\r\n|\r|\n)/g, '<br>');
    const images = Array.isArray(props.item.PictureURL) ? [...props.item.PictureURL.map(el => el._text)] : [props.item.PictureURL._text]
    const localizedAspects = props.allAspects;
    const sellerDisplay = props.articleOptions.sellerName || props.item.Seller.UserID._text
    const seller = props.item.Seller.UserID._text
    const paymentOptions = props.articleOptions.paymentOptions.filter(el => el.selected);
    const shippingOptions = props.articleOptions.shippingOptions.filter(el => el.selected);
    const shipping = props.item.ShippingCostSummary.ShippingServiceCost._text
    const aspectHeadline = props.articleOptions.aspectHeadline;
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

    return (
        <div id="template">
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="./index.css" />
            <nav class="template-hamburger">
                <input type="checkbox" id="template-burgerbutton" />
                <label for="template-burgerbutton" class="template-burgerimage" title="Navigation">&#x2630;</label>
                <ul>
                    <li><a class="template-hamburger-links" href="#" title="Link">Unser Shop</a></li>
                    <li><a class="template-hamburger-links" href="#" title="Link">Verkäuferprofil</a></li>
                    <li><a class="template-hamburger-links" href="#" title="Link">Bewertungen</a></li>
                    <li><a class="template-hamburger-links" href="#" title="Link">Shop speichern</a></li>
                    <li><a class="template-hamburger-links" href="#" title="Link">Kontakt</a></li>
                    <li><a href="#"><h2>Shopname</h2></a></li>
                </ul>
            </nav>
            <div class="template-navbar">
                <div id="template-logo">
                    <h2>Logo</h2>
                </div>
                <div class="template-links">
                    <a href="">Unser Shop</a>
                    <a href="">Verkäuferprofil</a>
                    <a href="">Bewertungen</a>
                    <a href="">Shop speichern</a>
                    <a href="">Kontakt</a>
                </div>
            </div>
            <div id="layout__layout-4">
                <div class="row">
                    <div class="col col-md-6">
                        <div id="layout__gallery">
                            <div>
                                <div>
                                    <div class="content__gallery content__gallery--flex-column content__gallery--right ">
                                        <div class="thumb__float thumb1" id="template-thumb1">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/FhgAAOSw5eReey61/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb2" id="template-thumb2">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/8JEAAOSwhI9eey61/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb3" id="template-thumb3">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/Dm8AAOSwhRZeey62/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb4" id="template-thumb4">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/iK0AAOSwD75eey62/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb5" id="template-thumb5">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/2nEAAOSwTw1eey61/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb6" id="template-thumb6">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/awUAAOSwW8leey62/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb7" id="template-thumb7">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/DYUAAOSwSWZeey63/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="thumb__float thumb8" id="template-thumb8">
                                            <div class="thumb__wrapper vertical-align-middle"><span class="vertical-align-helper"></span><img src="https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/e-IAAOSwp2heey62/$_1.JPG?set_id=880000500F" /></div>
                                        </div>
                                        <div class="slider__wrapper">
                                            <div class="slider">
                                                {/* <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/FhgAAOSw5eReey61/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/8JEAAOSwhI9eey61/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/Dm8AAOSwhRZeey62/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/iK0AAOSwD75eey62/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/2nEAAOSwTw1eey61/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/awUAAOSwW8leey62/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/DYUAAOSwSWZeey63/$_1.JPG?set_id=880000500F)"></div>
                                                <div style="background-image:url(https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/e-IAAOSwp2heey62/$_1.JPG?set_id=880000500F)"></div> */}
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
                                        <h2 id="template-title">Computer PC Desktop Gold G5420 3,8GHz 8GB 1TB HDD UHD</h2>
                                        <hr />
                                        <p id="template-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                                        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
                  diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                <div class="col col-md-12 order-2">
                                    <div>
                                        <hr />
                                        <h3 id="template-payment-methods">Varianten</h3>
                                        <div class="template-variation-container">
                                            <div class="template-variation-inline">
                                                <div class="template-variation">
                                                    <span>
                                                        Schwarz
                      </span>
                                                </div>
                                            </div>
                                            <div class="template-variation-inline">
                                                <div class="template-variation">
                                                    <span>
                                                        Weiß
                      </span>
                                                </div>
                                            </div>
                                            <div class="template-variation-inline">
                                                <div class="template-variation">
                                                    <span>
                                                        Gelb
                      </span>
                                                </div>
                                            </div>
                                            <div class="template-variation-inline">
                                                <div class="template-variation">
                                                    <span>
                                                        Lila
                      </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <hr />
                                        <h3 class="template-variation-headline">Varianten</h3>
                                        <div class="template-variation-inline">
                                            <div class="template-variation">
                                                <span>
                                                    Schwarz
                    </span>
                                            </div>
                                        </div>
                                        <div class="template-variation-inline">
                                            <div class="template-variation">
                                                <span>
                                                    Weiß
                    </span>
                                            </div>
                                        </div>
                                        <div class="template-variation-inline">
                                            <div class="template-variation">
                                                <span>
                                                    Gelb
                    </span>
                                            </div>
                                        </div>
                                        <div class="template-variation-inline">
                                            <div class="template-variation">
                                                <span>
                                                    Lila
                    </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="template-price-wrapper">
                                        <div class="template-price-inner">
                                            <div class="template-price-organizer">
                                                <div class="template-price-container">
                                                    <h1 id="template-price">399.99 €</h1>
                                                </div>
                                                <div class="template-shipping">
                                                    <h4>+ 6,49€ Versandkosten</h4>
                                                </div>
                                            </div>
                                            <div class="template-price-organizer">
                                                <a href="">
                                                    <button class="template-buy-btn">Sofort kaufen<i style={{ paddingLeft: "10px" }} class="fa fa-shopping-bag"></i>
                                                    </button>
                                                </a>
                                                <a href="">
                                                    <button class="template-buy-btn">kontaktieren<i style={{ paddingLeft: "10px" }} class="fa fa-paper-plane"></i>
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
                <div class="pc-tab">
                    <input checked="checked" id="tab1" type="radio" name="pct" />
                    <input id="tab2" type="radio" name="pct" />
                    <input id="tab3" type="radio" name="pct" />
                    <nav>
                        <ul>
                            <li class="tab1">
                                <label for="tab1">Artikelmerkmale</label>
                            </li>
                            <li class="tab2">
                                <label for="tab2">Bezahlung & Versand</label>
                            </li>
                            <li class="tab3">
                                <label for="tab3">Rechtliche Informationen</label>
                            </li>
                        </ul>
                    </nav>
                    <section>
                        <div class="tab1">
                            <h2>Artikelmerkmal Überschrift 1</h2>
                            <span class="content__bulletpoints">
                                <ul style={{ listStyleType: "none" }} class="bulletpoints__list" id="template-aspects">
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style={{ fontWeight: "700" }}>Prozessorgeschwindigkeit: </span>3,8 GHz</li>
                                    {/* <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Arbeitsspeichergröße: </span>8GB</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Betriebssystem: </span>Windows 10</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Besonderheiten: </span>Bluetooth, EIN/AUS-Schalter, Integrierter USB-Anschluss/Anschlüsse, Integrierter Wi-Fi
                Adapter, Kopfhörerbuchse, WLAN</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Grafikprozessor: </span>Integrierte Grafik</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Farbe: </span>silber</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Herstellergarantie: </span>2 Jahre</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Angebotspaket: </span>Nein</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Breite: </span>170</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Höhe: </span>380</li> */}
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style={{ fontWeight: "700" }}>MD Nummer: </span>MD34654</li>
                                </ul>
                            </span>
                            <h2>Artikelmerkmal Überschrift 2</h2>
                            <span class="content__bulletpoints">
                                <ul style={{ listStyleType: "none" }} class="bulletpoints__list" id="template-aspects">
                                    {/* <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Prozessorgeschwindigkeit: </span>3,8 GHz</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Arbeitsspeichergröße: </span>8GB</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Betriebssystem: </span>Windows 10</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Besonderheiten: </span>Bluetooth, EIN/AUS-Schalter, Integrierter USB-Anschluss/Anschlüsse, Integrierter Wi-Fi
                Adapter, Kopfhörerbuchse, WLAN</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Grafikprozessor: </span>Integrierte Grafik</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Farbe: </span>silber</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Herstellergarantie: </span>2 Jahre</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Angebotspaket: </span>Nein</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Breite: </span>170</li>
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style="font-weight:700">Höhe: </span>380</li> */}
                                    <li class="bulletpoints__item"><i aria-hidden="true" class="fa fa-chevron-right"></i><span style={{ fontWeight: "700" }}>MD Nummer: </span>MD34654</li>
                                </ul>
                            </span>
                        </div>
                        <div class="tab2">
                            <h2 id="template-payment-methods">Versandmethoden</h2>
                            <span class="template-shipping-icons"><img src="https://template-builder.de/icons/shipping/dhl.png" /><img src="https://template-builder.de/icons/shipping/dpd.png" /><img src="https://template-builder.de/icons/shipping/hermes.png" /><img
                                src="https://template-builder.de/icons/shipping/ups.png" />
                            </span>
                            <h2 id="template-payment-methods">Bezahlmethoden</h2>
                            <span class="template-payment-icons"><img src="https://template-builder.de/icons/payment/mastercard.png" /><img src="https://template-builder.de/icons/payment/paypal.png" /><img
                                src="https://template-builder.de/icons/payment/paysafecard.png" /><img src="https://template-builder.de/icons/payment/visa.png" /></span>
                        </div>
                        <div class="tab3">
                            <h2>Rechtliche Informationen</h2>
                            <p id="template-legal-info-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>

    )
}

export default kuststorm;
