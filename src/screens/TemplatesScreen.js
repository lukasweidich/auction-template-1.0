import React from "react"
import StyledPage from "../components/StyledPage"
import { PayPalButton } from "react-paypal-button-v2";
import fetch from "node-fetch";
import config from "../config";

const TemplatesScreen = props => {
    const amount = "0.01";
    return (
        <StyledPage>
            <h1>Templates - {props.user.email}</h1>
            <PayPalButton
                amount={amount}
                shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    fetch(`${config.HEROKU_SERVER}/payment/?userId=${props.user.uid}&paymentId=${data.orderID}&templateId=${"xxx0"}&amount=${amount}&date=${data.update_time}`, {
                        method: 'post'
                    })

                }}
                options={{
                    clientId: config.PAYPAL_CLIENT_ID,
                    merchantId: config.PAYPAL_MERCHANT_ID,
                }}
            />
        </StyledPage>
    )
}

export default TemplatesScreen;