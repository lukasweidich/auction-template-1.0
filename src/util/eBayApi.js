const fetch = require('node-fetch');
const convert = require('xml-js');
const config = require("../config");

const getAuthToken = async () => {
    var buffer = new Buffer(`${config.PROD_APP_ID__CLIENT_ID}:${config.PROD_CERT_ID__CLIENT_SECRET}`);
    var id_secret_b64 = buffer.toString('base64');
    let token = await fetch('https://cors-anywhere.herokuapp.com/https://api.ebay.com/identity/v1/oauth2/token?grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope', {
        method: 'post',
        headers:
        {
            Authorization: "Basic " + id_secret_b64,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
        .then(res => res.json())
        .then(json => { return json.access_token });
    return token
}

const getItemsFromSeller = async (seller) => {
    let url = `https://cors-anywhere.herokuapp.com/https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SECURITY-APPNAME=${config.PROD_APP_ID__CLIENT_ID}&GLOBAL-ID=EBAY-DE&itemFilter(0).name=Seller&itemFilter(0).value(0)=${seller}`
    let xml = await fetch(url).then(res => res.text()).then(body => body);
    let json = convert.xml2json(xml, { compact: true, spaces: 4 });
    json = JSON.parse(json)
    return json.findItemsAdvancedResponse.searchResult.item
}

const getItemFromItemId = async (itemId) => {
    itemId = "v1|" + itemId + "|0"
    var url = `https://api.ebay.com/buy/browse/v1/item/${itemId}`;
    let token = await getAuthToken();
    var auth = "Bearer " + token
    console.log(auth)
    let item = await fetch(url, {
        headers: {
            "Authorization": auth
        }
    })
    return item.json();
}

module.exports = { getAuthToken, getItemFromItemId, getItemsFromSeller }