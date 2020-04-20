import React from "react"
import StyledPage from "../components/StyledPage"
import "./Imprint.css"

const Imprint = props => {
    return (
        <StyledPage class="auction-template-imprint-container">
          <div class="auction-template-imprint-wrapper">
            <h1>Impressum</h1>
            <div class="auction-template-imprint-legal-info-wrapper">
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-left">
                  <h4>Herausgeber</h4>
                </div>
              </div>
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-right">
                  <h4>Auction Template</h4>
                  <h4>Hahler Straße 285</h4>
                  <h4>32427 Minden</h4>
                </div>
              </div>
            </div>

            <div class="auction-template-imprint-legal-info-wrapper">
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-left">
                  <h4>Vertreten durch</h4>
                </div>
              </div>
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-right">
                  <h4>demIT</h4>
                  <h4>Inh. Joyce Marvin Rafflenbeul</h4>
                  <h4>Hahler Straße 285</h4>
                  <h4>32427 Minden</h4>
                </div>
              </div>
            </div>

            <div class="auction-template-imprint-legal-info-wrapper">
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-left">
                  <h4>Kontakt</h4>
                </div>
              </div>
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-right">
                  <h4>info@dem-it.de</h4>
                  <h4>www.dem-it.de</h4>
                </div>
              </div>
            </div>

            <div class="auction-template-imprint-legal-info-wrapper">
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-left">
                  <h4>Steuernummer</h4>
                </div>
              </div>
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-right">
                  <h4>335 / 5181 / 2442</h4>
                </div>
              </div>
            </div>

            <div class="auction-template-imprint-legal-info-wrapper">
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-left">
                  <h4>Finanzamt</h4>
                </div>
              </div>
              <div class="auction-template-imprint-legal-info-50">
                <div cass="auction-template-imprint-legal-info-right">
                  <h4>Minden</h4>
                </div>
              </div>
            </div>


          </div>
        </StyledPage>
    )
}

export default Imprint;
