const fetch = require('node-fetch');
require('dotenv').config()

let getAllListingsFromSeller = (sellerId) => {
    // const PROD_APP_IDCLIENT_ID = "LukasWei-Template-PRD-fca7d98ed-bae2a879"
    // const PROD_DEV_ID = "e74b0f78-c151-47a2-b559-1c1da37c8db4"
    // const PROD_CERT_IDCLIENT_SECRET = "PRD-ca7d98edcf10-d471-4095-8d1c-5f7e"
    // const PROD_REDIRECT_URI_NAME = "Lukas_Weidich-LukasWei-Templa-pvulblro"

    // return process.env.PROD_APP_IDCLIENT_ID
    var url = `"https://api.ebay.com/buy/browse/v1/item/${sellerId}"`;
    // var auth = "Bearer " + AuthToken.access_token;
    // let item = await fetch(url, {
    //     headers: {
    //         "Authorization": auth
    //     }
    // })
    // return item.json();
}

console.log(getAllListingsFromSeller("trademax24"))