import React from 'react'
import { Heading, Flex, Small } from 'rebass'
import { Hero, CallToAction, ScrollDownIndicator, Laptop, Feature, Section, Phone, Subhead } from 'react-landing-page'
import { Button } from '@material-ui/core'
import Header from "../components/Header"
import "./LandingPage.css"

const LandingPage = (props) => {

    const hero = (
        <Hero
            color="black"
            bg="white"
        >
            <Heading>Steigern Sie Ihre Umsätze</Heading>
            <Subhead>mit Auction Template</Subhead>
            <Laptop />
            <Button href="/generator" variant="contained" color="primary" >Auktionsvorlage erstellen</Button>
        </Hero>
    )

    const feature = <div>
        <Heading textAlign="center">Einzigartige Funktionen - Nur mit Auction Template</Heading>
        <hr style={{ width: "20%", border: "1px solid black" }} />
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">sentiment_satisfied_alt</span>} description={<span>Eine <strong>einfache & intuitive</strong> Nutzung erlaubt einen schnellen Einstieg</span>}>Verständlich</Feature>
            <Feature icon={<span class="material-icons">code</span>} description={<span>Für die Verwendung sind <strong>keine Programmierkenntnisse</strong> notwendig</span>}>Ohne Vorwissen</Feature>
            <Feature icon={<span class="material-icons">timer</span>} description={<span>Die Auktionsvorlage ist in <strong>wenigen Sekunden</strong> erstellt</span>}>Direkt Loslegen</Feature>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">card_giftcard</span>} description={<span>Die kostenlosen Auktionsvorlagen sind <strong>dauerhaft</strong> abrufbar</span>}>Keine Kosten</Feature>
            <Feature icon={<span class="material-icons">format_indent_increase</span>} description={<span>Sie können sich zurücklehnen - Die Artikelinformationen werden <strong>automatisch</strong> eingefügt</span>}>Keine Doppelpflege</Feature>
            <Feature icon={<span class="material-icons">format_paint</span>} description={<span>Die Artikelmerkmale und das Design der Auktionsvorlage lassen sich vollständig <strong>bearbeiten</strong></span>}>Konfigurierbar</Feature>
        </Flex>
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">phonelink</span>} description={<span>Auction Template lässt Ihre Produkte <strong>auf allen Geräten</strong> gut aussehen</span>}>Responsive</Feature>
            <Feature icon={<span class="material-icons">verified_user</span>} description={<span>Auction Template hält die <strong>eBay Richtlinien</strong> zu 100% ein</span>}>eBay-Richtlinien konform</Feature >
            <Feature icon={<span class="material-icons">emoji_events</span>} description={<span><strong>Alleinstellungsmerkmal</strong> - Setzen Sie sich mit Auction Template von Ihrer Konkurrenz ab</span>}>Erfolgreich auf eBay</Feature>
        </Flex >
        <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">security</span>} description={<span>Die Auktionsvorlagen werden <strong>ohne eine eBay Anmeldung</strong> erstellt</span>}>Keine Anmeldung, kein Risiko</Feature>
            <Feature icon={<span class="material-icons">contacts</span>} description={<span>Ständiger Entwicklungsfortschritt: Auction Template nimmt Rücksicht auf <strong>Ihre Wünsche</strong></span>}>Kontaktfreudige Entwickler</Feature >
            <Feature icon={<span class="material-icons">policy</span>} description={<span>Auction Template ist offizieller Teil des <strong>eBay Developers Programs</strong></span>}>Geprüft</Feature>
        </Flex >
    </div >


    return (
        <html>
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </head>
            <body>
                <div style={{ height: "100vh", backgroundImage: "url(" + "https://dem-it.de/auction-template/landing_rocket.png" + ")", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "center" }} >
                    <Header />
                    <div style={{ marginTop: "-32px" }}>
                        {hero}
                    </div>
                </div>
                <div style={{ backgroundColor: "#e8e8eb" }}>
                    <div style={{ marginLeft: "10em", marginRight: "10em" }}>
                        {feature}
                    </div>
                </div>
            </body >
        </html >
    )
}

export default LandingPage 