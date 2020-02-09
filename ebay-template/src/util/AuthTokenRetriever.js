var request = require("request");
var cron = require('node-cron');
const fs = require('fs');
require('dotenv').config()
import URLs from "../Constants/MiscAPI"

const getAuthToken = () => {
    var buffer = new Buffer(process.env.PROD_APP_ID__CLIENT_ID + ":" + process.env.PROD_CERT_ID__CLIENT_SECRET);
    var id_secret_b64 = buffer.toString('base64');

    var options = {
        method: 'POST',
        url: URLs.ebayAuthApi,
        headers:
        {
            Authorization: "Basic " + id_secret_b64,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:
        {
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        fs.writeFile('./src/Constants/AuthToken.js', "const token = " + body + "\nexport default token", (err) => {
            if (err) throw err;
        });
    });
}

const runPeriodically = () => {
    cron.schedule('0 */2 * * *', () => {
        getAuthToken();
    });
}

runPeriodically()