import React from 'react'
import { Heading, Flex, Small } from 'rebass'
import { CallToAction, ScrollDownIndicator, Laptop, Feature, Section, Phone, Subhead } from 'react-landing-page'
import { Button } from '@material-ui/core'
import StyledPage from "../components/StyledPage"
import InfoBlock from "../components/LandingPageInfoBlock"
import InfoBlockGroup from "../components/LandingPageInfoBlockGroup"
import Hero from "../components/LandingPageHero"
import "./LandingPage.css"
import FeatureContainer from '../components/LandingPageFeatureContainer'

const LandingPage = (props) => {
    document.title = "Home | Auction Template"
    const feature = <div>
        <Flex style={{ height: "25%" }} flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">sentiment_satisfied_alt</span>} description={<span>Eine <strong>einfache & intuitive</strong> Nutzung erlaubt einen schnellen Einstieg</span>}>Verständlich</Feature>
            <Feature icon={<span class="material-icons">code</span>} description={<span>Für die Verwendung ist <strong>kein technisches Wissen</strong> notwendig</span>}>Ohne Vorwissen</Feature>
            <Feature icon={<span class="material-icons">timer</span>} description={<span>Die Auktionsvorlage ist in <strong>wenigen Sekunden</strong> erstellt</span>}>Direkt Loslegen</Feature>
        </Flex>
        <Flex style={{ height: "25%" }} flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">card_giftcard</span>} description={<span>Die kostenlosen Auktionsvorlagen sind <strong>dauerhaft</strong> abrufbar, es gibt keinen Haken</span>}>Keine Kosten</Feature>
            <Feature icon={<span class="material-icons">format_indent_increase</span>} description={<span>Sie können sich zurücklehnen - Die Artikelinformationen werden <strong>automatisch</strong> eingefügt</span>}>Keine Doppelpflege</Feature>
            <Feature icon={<span class="material-icons">format_paint</span>} description={<span>Die Artikelmerkmale und das Design der Auktionsvorlage lassen sich vollständig <strong>bearbeiten</strong></span>}>Konfigurierbar</Feature>
        </Flex>
        <Flex style={{ height: "25%" }} flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">phonelink</span>} description={<span>Auction Template lässt Ihre Produkte <strong>auf allen Geräten</strong> gut aussehen</span>}>Responsive</Feature>
            <Feature icon={<span class="material-icons">verified_user</span>} description={<span>Auction Template hält die <strong>eBay Richtlinien</strong> zu 100% ein</span>}>eBay-Richtlinien konform</Feature >
            <Feature icon={<span class="material-icons">emoji_events</span>} description={<span><strong>Heb Dich ab!</strong> - Setzen Sie sich mit Auction Template von Ihrer Konkurrenz ab</span>}>Erfolgreich auf eBay</Feature>
        </Flex >
        <Flex style={{ height: "25%" }} flexWrap="wrap" justifyContent="center">
            <Feature icon={<span class="material-icons">security</span>} description={<span>Die Auktionsvorlagen werden <strong>ohne eine eBay Anmeldung</strong> erstellt</span>}>Keine Anmeldung, kein Risiko</Feature>
            <Feature icon={<span class="material-icons">contacts</span>} description={<span>Ständiger Entwicklungsfortschritt und Möglichkeit, auf <strong>Ihre Wünsche</strong> individuell einzugehen</span>}>Nähe zu Entwicklern</Feature >
            <Feature icon={<span class="material-icons">policy</span>} description={<span>Auction Template ist offizieller Teil des <strong>eBay Developers Programs</strong></span>}>Geprüft</Feature>
        </Flex >
    </div >


    return (
        <StyledPage>
            <Hero />
            <InfoBlockGroup>
                <InfoBlock
                    title="EINFACH. SCHNELL. AUTOMATISIERT."
                    text="Auction Template ist das erste Online-Tool zur vollständigen Generierung einer zu 100% für mobile Geräte optimierten Auktionsvorlage aus Ihren bereits existierenden eBay Inseraten. Auction Template nimmt am offiziellen eBay Developers Program teil und ermöglicht so eine noch nie dagewesene, unglaublich effiziente und zeitsparende Erstellung passgenauer und hoch optimierbarer eBay Auktionsvorlagen."
                />
                <InfoBlock
                    title="EINZIGARTIGE FUNKTIONEN - NUR MIT AUCTION TEMPLATE"
                    text="Auction Template vereint eine breite Funktionsvielfalt mit einer kinderleichten Nutzung. Es werden keine HTML- oder sonstige Programmierkenntnisse benötigt, um mit Auction Template in sekundenschnelle fertige Autionsvorlagen zu generieren."
                />
                <InfoBlock
                    title="DAS NÄCHSTE LEVEL"
                    text="Heben Sie Ihren eBay Shop auf die nächste Stufe - mit Auction Template."
                />
            </InfoBlockGroup>
            <FeatureContainer>
                {feature}
            </FeatureContainer>
        </StyledPage>
    )
}

export default LandingPage
