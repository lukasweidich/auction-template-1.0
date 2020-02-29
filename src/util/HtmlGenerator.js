const createHtmlFromItem = (item) => {
    return `<!DOCTYPE html>
        <html lang="de" dir="ltr">

        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slideshow.css">
          <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template_1.css">
          <title>eBay Template 1</title>
        </head>

        <body>
          <div class="nav">
            <input type="checkbox" id="nav-check" />
            <div class="nav-header">
              <div class="nav-title"> demIT </div>
            </div>
            <div class="nav-btn"> <label for="nav-check"> <span></span> <span></span> <span></span> </label> </div>
            <div class="nav-links"> <a href="https://www.ebay.de/usr/dem-it" target="_blank">Unser Shop</a> <a
                href="https://www.ebay.de/str/demithardware" target="_blank">Über uns</a> <a
                href="https://www.ebay.de/fdbk/feedback_profile/dem-it?filter=feedback_page:All&_trksid=p2545226.m2531.l4585"
                target="_blank">Bewertungen</a> <a
                href="https://contact.ebay.de/ws/eBayISAPI.dll?FindAnswers&frm=284&requested=dem-it" target="_blank">Kontakt</a>
            </div>
          </div>
          <div class="body-wrap">
            <div class="wrap">
              <div class="column-wrapper container">
                <div class="column more-top-padding-mobile">
                  <center>
                    <dl id="simple-gallery">
                      <dt tabindex="1"> <a href="#img1"><img
                            src="${item.image.imageUrl}"></a></dt>
                      <dd id="img1" style="opacity: 1 !important;"><img
                          src="${item.image.imageUrl}"></dd>
                      <dt tabindex="2"><a href="#img2"><img
                            src="${item.additionalImages[0].imageUrl}"></a></dt>
                      <dd id="img2"><img src="${item.additionalImages[0].imageUrl}">
                      <dt tabindex="3"><a href="#img3"><img
                            src="${item.additionalImages[1].imageUrl}"></a></dt>
                      <dd id="img3"><img src="${item.additionalImages[1].imageUrl}"></dd>
                      <dt tabindex="4"><a href="#img4"><img
                            src="${item.additionalImages[2].imageUrl}"></a></dt>
                      <dd id="img4"><img src="${item.additionalImages[2].imageUrl}"></dd>
                    </dl>
                  </center>
                </div>
                <div class="column less-top-padding">
                  <div class="elem">
                    <h1 id="title">${item.title}</h1>
                  </div>
                  <div class="elem">
                    <h3 id="description">Zustandsbeschreibung:<br><br>
                      ➡️ Optisch: Das Gerät weist nur wenige Gebrauchsspuren in Form von leichten Kratzern auf der Bodenplatte auf, der allgemeine Zustand ist mit der Note ‚noch Sehr Gut‘ (1-) ausgezeichnet.
                      <br><br>
                      ➡️ Technisch: sehr guter Zustand, 110 Ladezyklen / ~90,3% Batteriekapazität </h3>
                  </div>
                  <div class="elem">
                    <h2 id="highlights">Highlights</h2>
                    <ul>
                      <li>2,9 GHz Quad‑Core Intel Core i7 (Turbo Boost bis zu 3,9 GHz) mit 8 MB gemeinsam genutztem L3 Cache</li>
                      <li>16 GB 2133 MHz LPDDR3 Arbeitsspeicher (On‑Board)</li>
                      <li>1TB/1024GB SSD auf PCIe Basis (On‑Board)</li>
                      <li>Radeon Pro 560 mit 4 GB GDDR5 Grafikspeicher</li>
                      <li>Intel Iris Plus Graphics 640 1536MB (integriert)</li>
                      <li>kostenloser Versand</li>
                    </ul>
                  </div>
                  <div class="column-wrapper-small elem">
                    <div class="column-small">
                      <h2>1949.00 EUR</h2>
                    </div>
                    <div class="column-small">
                      <h3>Kostenloser Versand</h3>
                    </div>
                  </div>
                  <p> Differenzbesteuerung gem. § 19 USTG, ein Ausweis von Umsatzsteuer ist daher nicht möglich. </p>
                </div>
              </div>
              <div class="elem">
                <h2 class="headline-margin">Hardware</h2>
                <center>
                  <div class="divider"></div>
                </center>
                <ul>
                  <li>MacBook Pro (15 Zoll, 2017, Vier Thunderbolt 3 Anschlüsse) A1707</li>
                  <li>2,9 GHz Quad‑Core Intel Core i7 (Turbo Boost bis zu 3,9 GHz) mit 8 MB gemeinsam genutztem L3 Cache</li>
                  <li>16 GB 2133 MHz LPDDR3 Arbeitsspeicher (On‑Board)</li>
                  <li>1TB/1024GB SSD auf PCIe Basis (On‑Board) - ORIGINAL APPLE -</li>
                  <li>Radeon Pro 560 mit 4 GB GDDR5 Grafikspeicher</li>
                  <li>Intel Iris Plus Graphics 640 1536MB (integriert)</li>
                  <li>Tastaturlayout: QWERTZ (deutsches Layout)</li>
                  <li>Retina Display</li>
                  <li>15,4" Display (39,11 cm Diagonale) mit LED Hintergrund-Beleuchtung und IPS Technologie, native Auflösung von 2880 x 1800 Pixeln bei 220 ppi mit Unterstützung für Millionen Farben</li>
                </ul>
              </div>
              <div class="elem">
                <h2 class="headline-margin">Lieferumfang</h2>
                <center>
                  <div class="divider"></div>
                </center>
                <ul>
                  <li>Apple MacBook Pro 15" A1707 2017</li>
                  <li>*ORIGINAL* Apple USB-C Netzteil</li>
                  <li>*ORIGINAL* Apple USB-C Netzkabel</li>
                  <li>*ORIGINAL* Apple MacBook Pro OVP (matching numbers)</li>
                  <li>Neutrale Versandverpackung</li>
                  <li>-Kein weiteres Zubehör-</li>
                </ul>
              </div>
              <div class="elem more-top-margin">
                <h2 class="headline-margin">Zahlungsarten</h2>
                <center>
                  <div class="divider"></div>
                </center>
                <div class="column-wrapper-small align-left">
                  <div class="column-small"> <img src="https://template-builder.de/icons/iconfinder_PayPal_224442.png"
                      id="icon" /> </div>
                  <div class="column-small">
                    <p> Bezahlung per PayPal - Sofortige Bezahlung, sowie Möglichkeit der Zahlung mit Kreditkarte und
                      Lastschrift werden über PayPal angeboten. Für Überweisung oder Abholung in unserem Geschäft, nehmen Sie
                      bitte Kontakt mit uns auf. </p>
                  </div>
                </div>
              </div>
              <div class="elem more-top-margin">
                <h2 class="headline-margin">Versand</h2>
                <center>
                  <div class="divider"></div>
                </center>
                <div class="column-wrapper-small align-left">
                  <div class="column-small"> <img src="https://template-builder.de/icons/DHL-icon.png" id="icon" /> </div>
                  <div class="column-small">
                    <p> Versand per DHL (Paketversand)- Versandzeit 1-3 Werktage* </p>
                  </div>
                </div>
                <p class="text-margin"> *Bitte beachten Sie, dass die Ware frühestens am Tag der vollständigen Bezahlung
                  versendet wird! </p>
              </div>
              <div class="elem more-top-margin more-bot-margin">
                <h2 class="headline-margin">Gewährleistung</h2>
                <center>
                  <div class="divider"></div>
                </center>
                <p class="text-margin"> Auf den hier angebotenen Artikel erhalten Sie die gesetzliche Mindestgewährleistung.<br>
                  -Bei gebrauchter Ware: 12 Monate/1 Jahr<br> -Bei neuer/ungeöffneter Ware: 24 Monate/2 Jahre<br> <br> Ob es
                  sich um neue oder gebrauchte Ware handelt, vermerken wir immer in dem Feld *Artikelzustand und *Artikelbeschreibung. </p>
              </div>
            </div>
          </div>
        </body>

        </html>`

}

module.exports = { createHtmlFromItem }
