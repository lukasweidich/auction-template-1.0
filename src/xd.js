const fetch = require('node-fetch');
const convert = require('xml-js');
const config = require("./config");

const getItemDetails = async (itemId) => {
    let url = `${config.EBAY_GETSINGLEITEM}&ItemID=${itemId}`
    let xml = await fetch(url).then(res => res.text()).then(body => body);
    let json = convert.xml2json(xml, { compact: true, spaces: 4 });
    json = JSON.parse(json)
    return json
    // return { response: json.GetSingleItemResponse.Item ? json.GetSingleItemResponse.Item.ItemSpecifics.NameValueList : json.GetSingleItemResponse.Errors, status: json.GetSingleItemResponse.Ack._text };
}

getItemDetails("38335737841").then(console.log)