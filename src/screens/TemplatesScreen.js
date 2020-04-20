import React, { useState } from "react"
import StyledPage from "../components/StyledPage"
import TemplatePreview from "../components/TemplatePreview"
import LoadingPage from "../screens/LoadingPage"
import { PayPalButton } from "react-paypal-button-v2";
import fetch from "node-fetch";
import config from "../config";

const TemplatesScreen = props => {
    document.title = "Shop | Auction Template"
    // let templates = //fetch all templates
    // const [loaded, setLoaded] = new useState(false);
    // const [templates, setTemplates] = new useState([]);
    // fetch("https://secure-peak-00819.herokuapp.com/templates", {
    //     method: 'get'
    // }).then(res => res.json())
    //     .then(body => {
    //         setTemplates(body[0]);
    //         setLoaded(true)
    //     });

    return (
        <StyledPage >
            <div style={{ minHeight: "100vh", backgroundColor: "#e6e6e6" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                    {props.templates ?
                        props.templates.map(template => {
                            return (
                                <div style={{ margin: "1em" }}>
                                    < TemplatePreview
                                        id={template.id}
                                        name={template.name}
                                        price={template.price}
                                        currency={template.currency}
                                        image={{
                                            alt: template.alt,
                                            height: "140",
                                            src: template.src,
                                            title: template.name
                                        }}
                                        text={{
                                            title: template.name,
                                            text: template.description
                                        }}
                                    />
                                </div>
                            )
                        })
                        :
                        <LoadingPage></LoadingPage>
                    }
                </div>
            </div>
        </StyledPage>
    )
}

export default TemplatesScreen;