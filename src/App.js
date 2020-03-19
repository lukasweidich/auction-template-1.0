import React, { useState } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar"
import PreviewContainer from "./components/PreviewContainer"
import Footer from "./components/Footer"
import Texts from "./constants/Texts"
import Misc from "./constants/Misc"
import Colors from "./constants/Colors"
import AuthToken from "./constants/AuthToken"
import URLs from "./constants/MiscAPI"
import HtmlGenerator from "./util/HtmlGenerator"
import ReactGenerator from "./util/ReactGenerator"
import Content from './components/Content';
import Editable from './components/Editable';
import Combobox from "./components/Combobox"
import Removable from "./components/Removable"
require('dotenv').config()
const fetch = require('node-fetch');
const convert = require('xml-js');
const request = require("request");

const app = (props) => {
  let [seller, setSeller] = new useState();
  let [sellersItems, setSellersItems] = new useState();
  // let [htmlCode, setHtmlCode] = new useState();
  let [prodDesc, setProdDesc] = new useState();

  const onChangeHandler = (event) => {
    setSeller(event.target.value);
  }

  const getAuthToken = () => {
    // var buffer = new Buffer(process.env.PROD_APP_ID__CLIENT_ID + ":" + process.env.PROD_CERT_ID__CLIENT_SECRET);
    // var id_secret_b64 = buffer.toString('base64');

    // var options = {
    //   method: 'POST',
    //   url: "https://api.ebay.com/identity/v1/oauth2/token",
    //   headers:
    //   {
    //     Authorization: "Basic " + id_secret_b64,
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   form:
    //   {
    //     grant_type: 'client_credentials',
    //     scope: 'https://api.ebay.com/oauth/api_scope'
    //   }
    // };

    // let token = "";
    // request(options, (error, response, body) => {
    //   if (error) {
    //     throw new Error(error);
    //   }
    //   console.log(body)
    // });
    // console.log(token)
    // return token
    return "v^1.1#i^1#r^0#I^3#p^1#f^0#t^H4sIAAAAAAAAAOVYa2wUVRTuttuaQoGEEt4h6yAJWmbnzuxzxu7i0gJd6NLSloIl2tydudMO3Z0Z5t6lXY2hKUIgYn8QHjEkpgQQ8QcJUpA2kvj4YSJEkeBbwUc0BiQaY0RMAGemS9lWUpBusIn7ZzPnnnvud77vnHvvDOgsKn5sS9WWqxMcD+X3dILOfIeDHQ+KiwrLJhbkzyzMA1kOjp7ORzqdXQU/lWOYTOhCHcK6pmLk6kgmVCzYxhCVMlRBg1jBggqTCAtEFOojsWqBcwNBNzSiiVqCckUrQ5SX9fI+xPuBhERP3M+ZVvVWzAYtRAUg7/OL8WAwyAMxLrLmOMYpFFUxgSoJURzgAA08NMs3sJzAsQIAbn+Aa6JcjcjAiqaaLm5AhW24gj3XyMI6MlSIMTKIGYQKRyNL6msi0crFKxrKmaxY4QwP9QSSFB76VKFJyNUIEyk08jLY9hbqU6KIMKaY8MAKQ4MKkVtg7gO+TXWAlSUpyHs9ccD5+JwQuUQzkpCMjMKyKBIt264CUolC0nfj0+Qivg6JJPO0wgwRrXRZfytTMKHICjJC1OJFkScjtbVUuDrVBvFqpNANKKknIEF0bV0lLYswIPFBJNFxiDgYDPCZhQaiZUgetlKFpkqKRRl2rdDIImSiRsO5YbO4MZ1q1BojIhMLUbaf9xaH/kCTJemAhinSqlqqoqRJhMt+vLsCg7MJMZR4iqDBCMMHbIpCFNR1RaKGD9qVmCmeDhyiWgnRBYZpb293t3vcmtHCcACwzJpYdb3YipKQsn2tXrf8lbtPoBU7FRGZM7EikLRuYukwK9UEoLZQYS/w84FghvehsMLDrf8wZOXMDO2HXPUH9LFiQPIjDwsDQVEO5KJDwpkiZSwcKA7TdBIabYiYZSoiWjTrLJVEhiIJHp/MeYIyoiU/L9NeXpbpuE/y06yMEEAoHhf54P+pUe611OuRaCCSo1rPUZ3LWg27GuhybHkTv0hbvyYlxvzrWla2lrW0pZellQD0Lq1bvmx9oM7bErrXbrhz8qKmo1otoYjpnDBg9XrOWPAYUi00SLoeJRKmYVSJYivRsSWyNR+bAaCuuK3GdotaktGguaNbpmYb8ahyjuh6NJlMERhPoGiudvP/ZCe/Y3qKedMZUzmZ+g0IqUgDlxS3raYbbxDdBsJayjBvZ+4a68xu0NqQau6AxNASCWQ0sqMW+sHra5/rI/HxLw+L+8s9lzeVsVPbYkIxS6h5rGX2QBRV4Bg7jVlf0OvngNcPRpVXha1pQ3qsnUNVGiZIGjk15+L7ulYzQ1/xw3n2j+1yHAddjqP5DgdgwDx2Lni4qGCVs6BkJlYIcitQdmOlRTXfXA3kbkNpHSpGfpFDXwUvzcv6qNDzFJg++FmhuIAdn/WNAcy+PVLITpo2waTEw/Isx7EANIG5t0ed7FTnlIvl/TtiJcdOn3j+C7p63Occc2T/AjBh0MnhKMxzdjnyqsC+Csf+3T9OPvX2nlPpnt0/bDqw9/Er26b/cXDqjNAn61+8OBe8OWPcuT8bd57E8/fNP1J+ObLJu3tZ88dO6tQbU2fPeO+Jm8ee2TWnO/+j/rNP/0IOfVZy86s935b9fMF78uAlJsRsj8IbLy2cKNf0HS7RizcdPees6Jt1dPbJ9quxLzd2L1yjOy5sVku747396zbHqbdev/J74q/+7/tP74KHe9/54MyeM33w7KFnf9s6qWrt2uYPr5eWlfbu2Baj9OuNVze+DM9fONPLGu++sn0WfYLa9uqc78Y99+mNjqXXOsd/s/OFLurX9xf0tb9W/PUBz45HN269VqVOm5V3fO/lDeeFS6WTmRtTqvcZA/L9DfwX8dDuEQAA"
  }

  const getItemsFromSeller = async (seller) => {
    let url = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SECURITY-APPNAME=LukasWei-Template-PRD-fca7d98ed-bae2a879&GLOBAL-ID=EBAY-DE&itemFilter(0).name=Seller&itemFilter(0).value(0)=${seller}`
    let xml = await fetch(url).then(res => res.text()).then(body => body);
    let json = convert.xml2json(xml, { compact: true, spaces: 4 });
    json = JSON.parse(json)
    return json.findItemsAdvancedResponse.searchResult.item
  }

  const mapItemsFromSellerToComboboxFormat = (sellersItems) => {
    let arr = [];
    sellersItems.forEach(item =>
      arr.push({ "value": item["itemId"]["_text"], "text": item["title"]["_text"] })
    );
    return arr;
  }

  const getItemFromItemId = async (itemId) => {
    itemId = "v1|" + itemId + "|0"
    var url = `${URLs.eBayApi}${itemId}`;
    var auth = "Bearer " + getAuthToken();
    let item = await fetch(url, {
      headers: {
        "Authorization": auth
      }
    })
    return item.json();
  }

  const onClickHandler = async (itemId) => {
    let item = await getItemFromItemId(itemId);
    // setHtmlCode(HtmlGenerator.createHtmlFromItem(item));
    setProdDesc(<ReactGenerator item={item} />);
  }

  const onClickHandlerSeller = async (seller) => {
    let allItems = await getItemsFromSeller(seller);
    let comboboxItems = mapItemsFromSellerToComboboxFormat(allItems);
    setSellersItems(comboboxItems)
  }

  return (
    <div style={{ margin: "24px" }}>
      <Content>
        <SearchBar
          colors={Colors}
          labelText={"eBay Nutzername"}
          buttonText={Texts.magnifyingGlass}
          click={() => onClickHandlerSeller(seller)}
          change={onChangeHandler} />
        <div>
          <Combobox
            items={sellersItems}
            onClick={onClickHandler}
          />
        </div>
        <PreviewContainer
          productDescription={prodDesc} />
      </Content>
    </div>
  );
}

export default app;