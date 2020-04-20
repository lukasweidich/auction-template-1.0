import React, { useState } from "react"
import LoadingPage from "../screens/LoadingPage"
import StyledPage from "../components/StyledPage"
import Detail from "../components/TemplateDetail"
import { PayPalButton } from "react-paypal-button-v2"
import config from "../config"

const TemplateDetail = props => {
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

    return (
        error ?
            <h1>falsch</h1>
            :
            loaded ?
                <StyledPage>
                    <div style={{ minHeight: "100vh", backgroundColor: "#e6e6e6" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Detail
                                img={template.src}
                                title={template.name}
                                description={template.description}
                                price={template.price}
                                currency={template.currency}
                                discountedFrom={template.discountedFrom}
                            >
                                {paypal}
                            </Detail>
                        </div>
                    </div>
                </StyledPage>
                :
                <LoadingPage></LoadingPage>
    )
}

export default TemplateDetail;