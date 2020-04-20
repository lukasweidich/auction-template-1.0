import React, { useState } from "react"
import "../App.css"
import "./ProductPage.css"
import LoadingPage from "../screens/LoadingPage"
import StyledPage from "../components/StyledPage"
import { PayPalButton } from "react-paypal-button-v2"
import config from "../config"

const productPage = props => {

    const [loaded, setLoaded] = new useState(false);
    const [template, setTemplate] = new useState();
    const [error, setError] = new useState(false);

    fetch(`https://secure-peak-00819.herokuapp.com/template/${props.match.params.id}`, {
        method: 'get'
    }).then(res => res.json())
        .then(body => {
            if (body[0][0]) {
                setTemplate(body[0][0]);
                setLoaded(true)
            } else {
                setError(true)
            }
        });

    const paypal = loaded ? (<PayPalButton
        amount={template.price}
        shippingPreference="NO_SHIPPING"
        onSuccess={(details, data) => {
            fetch(`${config.HEROKU_SERVER}/payment/?userId=${props.user.uid}&paymentId=${data.orderID}&templateId=${template.id}&amount=${template.price}&date=${Date(Date.now())}`, {
                method: 'post'
            }).then(() =>
                props.enqueueSnackbar(`Die Auktionsvorlage ${template.name} wurde erfolgreich für ${template.price}${template.currency} gekauft.`, "success")
            ).then(() =>
                fetch(`${config.HEROKU_SERVER}/add/?userId=${props.user.uid}&templateId=${template.id}`, {
                    method: 'post'
                })
            ).then(() =>
                props.enqueueSnackbar(`Die Auktionsvorlage ${template.name} wurde hinzugefügt.`, "success")
            )
        }}
        options={{
            clientId: config.PAYPAL_CLIENT_ID,
            merchantId: config.PAYPAL_MERCHANT_ID,
            currency: template.currency
        }}
    />) : null;

    const icons = (
        <div>
            <hr />
            <div class="auction-template-product-icons-wrapper">
                <div class="auction-template-product-icons-container">
                    <div class="auction-template-product-icons">
                        <span class="material-icons">
                            security
</span>
                        <h2>2020 eBay Richtlinien konform</h2>
                        <p>Diese Auktionsvorlage erfüllt die aktuellen eBay Richtlinien zu 100%.</p>
                    </div>
                    <div class="auction-template-product-icons">
                        <span class="material-icons">
                            smartphone
</span>
                        <h2>Responsive</h2>
                        <p>Diese Auktionsvorlage ist zu 100% Responsive auf Desktop, Tablet & Smartphone.</p>
                    </div>
                </div>
                <div class="auction-template-product-icons-container">
                    <div class="auction-template-product-icons">
                        <span class="material-icons">
                            sentiment_very_satisfied
</span>
                        <h2>Automatisches Auslesen</h2>
                        <p>Alle angezeigten Texte, Beschreibungen & Bilder werden in Sekundenschnelle vollständig & automatisch in die Auktionsvorlage integriert.</p>
                    </div>
                    <div class="auction-template-product-icons">
                        <span class="material-icons">
                            all_inclusive
</span>
                        <h2>Dauerhafte Nutzung</h2>
                        <p>Die Auktionsvorlage ist dauerhaft nutzbar & muss nur ein Mal bezahlt werden.</p>
                    </div>
                </div>
            </div>
        </div>
    )

    const list = (
        <ul style={{ listStyle: "none" }}>
            <span><span class="material-icons">
                chevron_right
</span>einmaliger Preis</span>
            <li><span class="material-icons">
                chevron_right
</span>sofortige Freischaltung</li>
            <li><span class="material-icons">
                chevron_right
</span>unbegrenzt viele Angebote generierbar</li>
            <li><span class="material-icons">
                chevron_right
</span>sofortiger Zugang zum hochentwickelten Online-Editor</li>
            <li><span class="material-icons">
                chevron_right
</span>unbegrenzte Updates auf Lebenszeit</li>
            <li><span class="material-icons">
                chevron_right
</span>Auktionsvorlagen auch in Plentymarkets, JTL, Afterbuy, Eazyauctions, Turbolister, Dreamrobot ... verwendbar</li>
        </ul>
    )

    return (
        loaded ?
            <StyledPage>
                <div class="auction-template-product-wrapper" >
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"></link>
                    <div class="auction-template-product-container">
                        <div class="auction-template-product-inner-wrapper">
                            <div class="auction-template-product-img-container">
                                <img class="auction-template-product-image" src={template.src} />
                                <h1>{template.name} Auktionsvorlage</h1>
                                <p>{template.description}</p>
                            </div>
                            <div class="auction-template-product-details-container">
                                <div class="auction-template-product-price-container">
                                    <div class="auction-template-price">
                                        {!(template.discountedFrom === template.price) &&
                                            <del>
                                                <span class="amount">{template.discountedFrom} {template.currency === "EUR" ? "€" : "$"}</span>
                                            </del>}
                                        <ins>
                                            <span class="amount">{template.price} {template.currency === "EUR" ? "€" : "$"}</span>
                                        </ins>
                                    </div>
                                </div>
                                <div class="auction-template-product-id-container">
                                    <h4>Artikelnummer: {template.id.toUpperCase()}</h4>
                                </div>
                                <div class="auction-template-product-listing">
                                    {list}
                                </div>
                                <div class="auction-template-product-paypal-container">
                                    {paypal}
                                </div>
                            </div>
                        </div>
                        {icons}
                    </div >
                </div >
            </StyledPage>
            :
            <LoadingPage />
    )
}

export default productPage;