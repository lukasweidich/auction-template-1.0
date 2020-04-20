import config from "../config";
const fetch = require('node-fetch');
const convert = require('xml-js');

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

    try {
        let json = convert.xml2json(xml, { compact: true, spaces: 4 });
        json = JSON.parse(json)
        if (json.findItemsAdvancedResponse) {
            if (json.findItemsAdvancedResponse.errorMessage) {
                return json.findItemsAdvancedResponse.errorMessage
            } else {
                let allItems = json.findItemsAdvancedResponse.searchResult.item;
                if (!Array.isArray(allItems)) {
                    allItems = [allItems]
                }
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
    catch (err) {
        alert(err.message);
    }
}

const sanititePrice = (priceString) => {
    return (priceString.split(".")[1].length < 2 ? priceString + "0" : priceString).replace(".", ",")
}

const sanitizeDigits = async (json) => {
    console.log(json)
    let tmp = { ...json };
    let item = tmp.GetSingleItemResponse.Item

    let currentPrice = sanititePrice(item.CurrentPrice._text)
    let convertedCurrentPrice = sanititePrice(item.ConvertedCurrentPrice._text)
    let listedShippingServiceCost = sanititePrice(item.ShippingCostSummary.ListedShippingServiceCost._text)
    let shippingServiceCost = sanititePrice(item.ShippingCostSummary.ShippingServiceCost._text)

    item = {
        ...item,
        CurrentPrice: { ...item.CurrentPrice, _text: currentPrice },
        ConvertedCurrentPrice: { ...item.ConvertedCurrentPrice, _text: convertedCurrentPrice },
        ShippingCostSummary: {
            ...item.ShippingCostSummary,
            ShippingServiceCost: { ...item.ShippingCostSummary.ShippingServiceCost, _text: shippingServiceCost },
            ListedShippingServiceCost: { ...item.ShippingCostSummary.ListedShippingServiceCost, _text: listedShippingServiceCost }
        }
    }

    console.log(item)

    tmp = { ...tmp, GetSingleItemResponse: { ...tmp.GetSingleItemResponse, Item: item } }
    return tmp;
}

const getItemFromItemId = async (itemId) => {
    let url = `${config.EBAY_GETSINGLEITEM}&ItemID=${itemId}`
    let xml = await fetch(url).then(res => res.text()).then(body => body);
    try {
        let json = convert.xml2json(xml, { compact: true, spaces: 4 });
        json = JSON.parse(json)
        // // sanitize prices in case they are missing a digit
        json = await sanitizeDigits(json);
        return json
    }
    catch (err) {
        alert(err.message);
    }
    // return { response: json.GetSingleItemResponse.Item ? json.GetSingleItemResponse.Item.ItemSpecifics.NameValueList : json.GetSingleItemResponse.Errors, status: json.GetSingleItemResponse.Ack._text };
}

export default { getAuthToken, getItemFromItemId, getItemsFromSeller }
