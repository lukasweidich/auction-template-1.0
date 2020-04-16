import React from "react"
import Header from "../components/Header"
import { PayPalButton } from "react-paypal-button-v2";
import fetch from "node-fetch";
import config from "../config";

const TemplatesScreen = props => {
    const amount = "0.01";
    return (
        <div>
            <Header />
            <h1>Templates - {props.user.email}</h1>
            <PayPalButton
                amount={amount}
                shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    fetch(`${config.HEROKU_SERVER}/payment/?userId=${props.user.uid}&paymentId=${data.orderID}&templateId=${"xxx0"}&amount=${amount}&date=${data.update_time}`, {
                        method: 'post'
                    })

                }}
                options={{
                    clientId: config.PAYPAL_CLIENT_ID,
                    merchantId: config.PAYPAL_MERCHANT_ID,
                }}
            />
        </div>
    )
}

export default TemplatesScreen;