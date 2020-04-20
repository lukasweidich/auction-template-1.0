import React from "react"
import StyledPage from "../components/StyledPage"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "../App.css"
const { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } = require('@material-ui/core');

const FAQScreen = props => {
    document.title = "FAQ | Auction Template"

    const faq = [
        { q: "Warum Auction Template?", a: "Auction Template ist das erste Online-Tool zur vollständigen Generierung einer HTML-Vorlage aus Ihren bereits existierenden eBay-Inseraten. Sparen Sie sich die aufwändige Doppelpflege Ihrer Inserate durch die mühsame Übertragung von Daten & Bildern Ihrer eBay-Inserate auf herkömmliche Auktionsvorlagen. Nur bei Auction Template ist eine fertige Auktionsvorlage inklusive kompletter Bildergalerie, Titel, Beschreibung, Preis, Bezahlmethoden und vieles mehr in nur wenigen Sekunden verfügbar und direkt einsatzbereit." },
        { q: "Gibt es eine Begrenzung/Limit bei der Generierung von Auktionsvorlagen?", a: "Die Antwort ist ein klares NEIN. Egal, ob Sie eine Auktionsvorlage bei uns gekauft haben oder unsere kostenlosen Auktionsvorlagen nutzen, Sie können so viele Auktionsvorlagen generieren wie Sie möchten und können." },
        { q: "Muss ich meine eBay-Anmeldedaten angeben, um Auktionsvorlagen aus meinen existierenden eBay-Inseraten erstellen zu können?", a: "Die Antwort ist auch hier ein klares NEIN. Sie werden an keiner Stelle von Auction Template aufgefordert, Ihre persönlichen eBay-Anmeldedaten preiszugeben. Auction Template ist offizieller Partner des eBay Developers Programs und hält sich zu 100% an die Nutzungsichtlinien der offiziellen eBay API." },
        { q: "Wie lange ist der Supportzeitraum nach Kauf einer Auktionsvorlage?", a: "Prinzipiell gilt: Sie können Auction Template zu jeder Zeit bei Fragen, Problemen oder Anregungen kontaktieren. Weitere Informationen und Kontaktdaten finden Sie im Impressum." },
        { q: "Kann eine Auktionsvorlage nach der Generierung ohne HTML-/Programmierkenntnisse bearbeitet werden?", a: "Jede unserer Auktionsvorlagen bietet großen Bearbeitungsspielraum: sei es das Ändern des Farbschemas oder des Preises, durch unseren fortschrittlichen & innovativen Online-Editor können Elemente einer Auktionsvorlage verändert, verschoben oder gelöscht werden." },
        { q: "Kann ich Auktionsvorlagen vor dem Kauf testen?", a: "In unserem Shop erhalten Sie bereits einen vollständigen visuellen Eindruck der gewünschten Auktionsvorlage. Wenn Sie Auction Template vor Kauf einer Auktionsvorlage vollständig testen wollen, können Sie gerne eine unserer umfangreichen, kostenlosen Auktionsvorlagen ausprobieren." },
        { q: "Aktualisieren sich Inhalte einer generierten Auktionsvorlage auch noch später direkt im eBay-Inserat automatisch?", a: "Auction Template befolgt penibel die offiziellen Richtlinien von eBay, somit entfällt eine automatische Aktualisierung einer Auktionsvorlage, da dies gezwungenermaßen den Einsatz von aktiven Inhalten nach sich ziehen würde, welches von eBay zum aktuellen Zeitpunkt zu Ihrem eigenen und den Schutz Ihrer Kunden verboten wird." },
        { q: "Personalisierung Ihrer Auktionsvorlage", a: "Sie möchten eine personalisierte/individualisierte Auktionsvorlage nach Ihren eigenen Wünschen & Maßstäben? Wir helfen Ihnen gerne weiter und erstellen Ihnen Ihre eigene automatisierte, individuelle Auktionsvorlage. Weitere Informationen & Kontaktdaten finden Sie im Impressum." }
    ]
    return (
        <StyledPage style={{ backgroundColor: "#e6e6e6", minHeight: "100vh" }} >
            <div style={{ width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "90%" }}>
                    {faq.map(el => {
                        return (
                            <div style={{ margin: ".5em" }}>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography style={{ fontWeight: "700" }} variant="h6">{el.q}</Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <Typography>
                                            {el.a}
                                        </Typography>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </div>
                        )
                    })}
                </div>
            </div>
        </StyledPage>
    )
}

export default FAQScreen;
