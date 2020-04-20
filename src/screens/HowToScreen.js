import React from "react"
import StyledPage from "../components/StyledPage"
import WalkthroughComponent from "../components/WalkthroughComponent"
import WalkthroughComponentGroup from "../components/WalkthroughComponentGroup"
import "../App.css"
import "./HowToScreen.css"

const HowToScreen = props => {
    return (
        <StyledPage style={{ backgroundColor: "#e6e6e6", minHeight: "100vh" }}>
            <WalkthroughComponentGroup class="auction-template-howto-component-group">
                <WalkthroughComponent
                    title={"Einen Artikel einladen"}
                    subheader={"Ohne Artikelnummer"}
                    src={"https://dem-it.de/auction-template/walkthrough/seller_filled.png"}
                    text={"Geben Sie Ihren eBay-Nutzernamen ein, um Ihre inserierten Produkte zu laden. Aus diesen können Sie nun den gewünschten Artikel auswählen. Drücken Sie auf den Knopf 'PRODUKTBESCHREIBUNG GENERIEREN', um die Auktionsvorlage automatisch generieren zu lassen."}
                    ratio={"70%"}
                    maxWidth={"500px"}
                />
                <WalkthroughComponent
                    title={"Einen Artikel einladen"}
                    subheader={"Mit Artikelnummer"}
                    src={"https://dem-it.de/auction-template/walkthrough/itemid_filled.png"}
                    text={"Geben Sie die eBay-Artikelnummer des gewünschten Inserats ein. Drücken Sie auf den Knopf 'PRODUKTBESCHREIBUNG GENERIEREN', um die Auktionsvorlage automatisch generieren zu lassen."}
                    ratio={"70%"}
                    maxWidth={"500px"}
                />
            </WalkthroughComponentGroup>
            <WalkthroughComponentGroup class="auction-template-howto-component-group-single">
                <WalkthroughComponent
                    title={"Artikelinformationen bearbeiten"}
                    src={"https://dem-it.de/auction-template/walkthrough/generalInformation.png"}
                    text={"Diese Felder werden automatisch befüllt, sobald Sie eine Auktionsvorlage für ein Inserat generieren. Sie lassen sich problemlos über den Editor bearbeiten."}
                    ratio={"31.25%"}
                    maxWidth={"1200px"}
                />
            </WalkthroughComponentGroup>
            <WalkthroughComponentGroup class="auction-template-howto-component-group">
                <WalkthroughComponent
                    title={"Eigenschaften bearbeiten"}
                    subheader={"Kürzen, Ergänzen"}
                    src={"https://dem-it.de/auction-template/walkthrough/aspects1.png"}
                    text={"Die Artikeleigenschaften stammen aus dem geladenen eBay-Inserat. Sollte die Anordnung oder Beschriftungen von einzelnen Elementen der Artikelmerkmale jedoch nicht Ihrer Vorstellung entsprechen, können Sie die Eigenschaften einfach an Ihre Vorstellungen anpassen."}
                    ratio={"70%"}
                    maxWidth={"500px"}
                />
                <WalkthroughComponent
                    title={"Eigenschaften bearbeiten"}
                    subheader={"Verschieben, Hinzufügen, Entfernen"}
                    src={"https://dem-it.de/auction-template/walkthrough/aspects2.png"}
                    text={"Merkmalgruppen können nach Belieben hinzugefügt und entfernt werden. In diesen befinden sich Merkmale, die ebenfalls flexibel an Position und Inhalt anpassbar sind."}
                    ratio={"70%"}
                    maxWidth={"500px"}
                />
            </WalkthroughComponentGroup>
            <WalkthroughComponentGroup class="auction-template-howto-component-group-single">
                <WalkthroughComponent
                    title={"Dienstleistungen"}
                    subheader={"Bezahl- und Versandmethoden"}
                    src={"https://dem-it.de/auction-template/walkthrough/payment-shipping.png"}
                    text={"Auch dieser Abschnitt wird durch die Angaben im eBay-Inserat befüllt. Sie können die Bezahl- und Versandmethoden problemlos anpassen."}
                    ratio={"70%"}
                    maxWidth={"500px"}
                />
                <WalkthroughComponent
                    title={"Ergänzende Texte"}
                    subheader={"Um Ihre Auktionsvorlage zu vervollständigen"}
                    src={"https://dem-it.de/auction-template/walkthrough/additionalTexts.png"}
                    text={"Fügen Sie nach Belieben weitere Textabschnitte wie z.B. 'Rechtliche Informationen' oder weitere Anmerkungen in Ihre Auktionsvorlage ein."}
                    ratio={"31.25%"}
                    maxWidth={"1000px"}
                />
            </WalkthroughComponentGroup>
        </StyledPage >
    )
}
//
export default HowToScreen;
