const fetch = require('node-fetch');
const convert = require('xml-js');
const config = require("../config");

const getAuthToken = async () => {
    var buffer = new Buffer(`${config.PROD_APP_ID__CLIENT_ID}:${config.PROD_CERT_ID__CLIENT_SECRET}`);
    var id_secret_b64 = buffer.toString('base64');
    let token = await fetch(`${config.EBAY_AUTH}`, {
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

const getItemsFromSeller = async (seller, attemptNumber) => {
    const entriesPerPage = 100;
    const pageNumber = attemptNumber || 1;
    const noItemsFoundText = "No items found.";

    let url = `${config.EBAY_FIND}&SECURITY-APPNAME=${config.PROD_APP_ID__CLIENT_ID}&GLOBAL-ID=EBAY-DE&itemFilter(0).name=Seller&itemFilter(0).value(0)=${seller}&paginationInput.pageNumber=${pageNumber}&paginationInput.entriesPerPage=${entriesPerPage}`
    let xml = await fetch(url).then(res => res.text()).then(body => body);
    let json = convert.xml2json(xml, { compact: true, spaces: 4 });
    json = JSON.parse(json)
    if (json.findItemsAdvancedResponse) {
        if (json.findItemsAdvancedResponse.errorMessage) {
            return json.findItemsAdvancedResponse.errorMessage
        } else {
            let allItems = json.findItemsAdvancedResponse.searchResult.item;
            if (json.findItemsAdvancedResponse.searchResult.item) {
                if (json.findItemsAdvancedResponse.paginationOutput.totalEntries._text > pageNumber * entriesPerPage) {
                    let nextItems = await getItemsFromSeller(seller, pageNumber + 1)
                    allItems = [...allItems, ...nextItems]
                }
                return allItems
            } else {
                return { error: { message: { _text: noItemsFoundText }, parameter: { _text: seller } } }
            }
        }
    }
}

// const getItemFromItemId = async (itemId) => {
//     itemId = "v1|" + itemId + "|0"
//     var url = `${config.EBAY_BROWSE}${itemId}`;
//     let token = await getAuthToken();
//     var auth = "Bearer " + token
//     let item = await fetch(url, {
//         headers: {
//             "Authorization": auth
//         }
//     })
//     return item.json();
// }

const getItemFromItemId = async (itemId) => {
    let url = `${config.EBAY_GETSINGLEITEM}&ItemID=${itemId}`
    let xml = await fetch(url).then(res => res.text()).then(body => body);
    let json = convert.xml2json(xml, { compact: true, spaces: 4 });
    json = JSON.parse(json)
    return json
    // return { response: json.GetSingleItemResponse.Item ? json.GetSingleItemResponse.Item.ItemSpecifics.NameValueList : json.GetSingleItemResponse.Errors, status: json.GetSingleItemResponse.Ack._text };
}

module.exports = { getAuthToken, getItemFromItemId, getItemsFromSeller }