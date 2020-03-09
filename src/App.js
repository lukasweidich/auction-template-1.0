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
  let [htmlCode, setHtmlCode] = new useState();

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
    return "v^1.1#i^1#p^1#r^0#I^3#f^0#t^H4sIAAAAAAAAAOVYa2wUVRTudLctTSmNESpBinWwCQFmdmb2NTthl2wp0IW2W7rlVRRyd+bOdtrZmWHuDO3iI7UxRGOCIfgWI3808YdGTAwxYmhijEFBjJhoDAHjD57WgIKi4OPO7lK2lbRIN9jE/bOZc8899zvfd869d4YZKK9cuKN5x6/VREXp3gFmoJQg2Cqmsrxs0QxX6ZyyEqbAgdg78MCAe9B1ZgkCadUQOiAydA3B+v60qiEhawyTtqkJOkAKEjSQhkiwRCERbW0ROJoRDFO3dFFXyfpYU5iEnCh6gewPiLIPhlgeW7XrMTv1MAm8EEqcBERfMinJfAiPI2TDmIYsoFlhkmM4hmK8FBPq5BiB8ws+P+33BrrI+nXQRIquYReaISNZuEJ2rlmAdXyoACFoWjgIGYlFVyTi0VjT8rbOJZ6CWJE8DwkLWDYa/bRMl2D9OqDacPxlUNZbSNiiCBEiPZHcCqODCtHrYG4DfpbqJBuUQ34o+fgk75d8sChUrtDNNLDGx+FYFImSs64C1CzFykzEKGYj2QNFK//UhkPEmuqdvzU2UBVZgWaYXN4Y3RhtbycjLXYvQOuhQnXCtKECC1LtHU2ULIKgFOKhRCUB5AAfDOUXykXL0zxmpWW6JikOaai+TbcaIUYNx3LDFnCDneJa3IzKloOo0I8b4dDb5YiaU9G2ujVHV5jGRNRnHydWYGS2ZZlK0rbgSISxA1mKcNsYhiKRYweztZgvn34UJrstyxA8nr6+PrrPS+tmysMxDOvZ0NqSELthGpDY1+n1nL8y8QRKyaYi4trC/oKVMTCWflyrGICWIiM+JhAK8nneR8OKjLX+w1CQs2d0RxSrQ0SZ84V8MiMFOMgGZL4YHRLJF6nHwQGTIEOlgdkLLVymIqREXGd2GpqKJHj9MuflZUhJgZBM+UKyTCX9UoBiZQgZCJNJMcT/nxrlVks9AUUTWkWp9aLVuazH2fWMIbeu7go16ls32GJroCe1pntRqjezKqMEgW9lx+pVW4MdvlT4Vrvh5smLugHbdVURM0VgwOn1IrLgNaV2YFqZBFRVbJhUoshJdGqJ7MxHOAAwFNppbFrU0x4d4B3dMW3JIp5UzlHDiKXTtgWSKowVZzf/j3bym6an4LvOlMoJ65cTUpFylxQ6qyaNtom0CZFum/h+RsedM7tT74Ua3gEtU1dVaK5jJy30ndbX6fUJ+PiXh8Xt5V68m8pUqm1RVXAJbZlqmd0RRRUwxU5j1s97g7zf7/NPKq9lWU07M1PtHGrWkQWl8VJzr7zNa7Vn9Et+pCT7YweJ95hBYl8pQTAepoGdz9xf7lrrdk2fgxQL0gqQaaSkNPzuakK6F2YMoJil5YSxFpxrKPissPchZvbIh4VKF1tV8JWBmXtjpIytuacaU+JlQvjWiFXsYubfGHWzte6Zr7VueebK9gt3X2vxykcWX7vvwLF905nqESeCKCtxDxIlO3bTh7mjp75devKYUdN8/sQPs/fXrQps2mf/kprxwWfldi+65L78o6I8KoRUddfcy5/89WWF9xJ8Kr65ZtAz9PbBOkKa+VjDtqp53+/ivml+edvOKzb/3Ksrw4d+ev/ZndNmeVoPDy/ST+pvLTid+PT5TYc//7jn6O6fZ1Scvbd/z4K6s0dqL9dsrR1a/cXOa2dKL9b6lZcuPH3it6vbz+8Zjn33B2leWLr/BGRf+OrAXfOqjv9e6xqmNk97fYFn4Sn+lXfnXz39RPJQ3Z8bH4m/caWyq2X4yY6nV1QM6efaHiSqZg5VvSjbBDqePlieuvj4UOM7Qw0fTp926aO5YubNxV/XuTpmVT/cQ/ezOfn+BskBEYPwEQAA"
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
    setHtmlCode(HtmlGenerator.createHtmlFromItem(item));
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
          text={htmlCode}
          colors={Colors} />
      </Content>

      <div>

        <Removable>
          <span>Email:</span>
        </Removable>
        <Editable>
          <span style={{ fontWeight: 700 }}>mail@example.com</span>
        </Editable>
      </div>

      <ReactGenerator item={Misc.testItem} typus={"demIT"} />
      <Footer />
    </div>
  );
}

export default app;