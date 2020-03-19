import React, { useState, useRef } from 'react';
import './App.css';
import PreviewContainer from "./components/PreviewContainer"
import URLs from "./constants/MiscAPI"
import ReactGenerator from "./util/ReactGenerator"
import Content from './components/Content';
import Combobox from "./components/new_Combobox"
import SearchBar from "./components/new_SearchBar"
import Switch from '@material-ui/core/Switch';
require('dotenv').config()
const fetch = require('node-fetch');
const convert = require('xml-js');

const app = (props) => {
  const [seller, setSeller] = new useState("");
  const [sellersItems, setSellersItems] = new useState();
  const [prodDesc, setProdDesc] = new useState();
  const [itemId, setItemId] = new useState("");
  const [checked, setChecked] = new useState(false);
  const [itemIdForDirectInput, setItemIdForDirectInput] = new useState("");

  const onChangeHandler = (event) => {
    setSeller(event.target.value);
  }

  const onComboBoxChange = (event) => {
    setItemId(event.target.value)
  }

  const getAuthToken = () => {
    return "v^1.1#i^1#p^1#f^0#r^0#I^3#t^H4sIAAAAAAAAAOVYW2wUVRjuttslpGATI5cQjNsBvOHMnNn7TLobt7SFBXqh25sliGdnzrRDd2eGOWdo96GlqQqaGOslvKDBKkYRkWgUxQsPGDRpfEF8gJhIjAlKCPUSY7wE0ZnZpWwraZFusIn7spn//Oc/3/99/3/OmQFDnvn37lq369eFrnmlo0NgqNTl4irAfE/56lvKSpeVl4ACB9fo0Moh93DZ+WoMM2ldaEFY11SMvP2ZtIoFxxilTEMVNIgVLKgwg7BARCEZb9go+Bgg6IZGNFFLU95EbZQKS2G/KAV5yR9KIchFLKt6JWarFqVkHw84MeCLRIKpQCQFrHGMTZRQMYEqiVI+4AM08NMc38qFBH9AAIAJhYJdlLcdGVjRVMuFAVTMgSs4c40CrNNDhRgjg1hBqFgiXp9siidq6xpbq9mCWLE8D0kCiYknP63RJORth2kTTb8MdryFpCmKCGOKjeVWmBxUiF8BcwPwHar9QX8wKIk+CXIhP5D9RaGyXjMykEyPw7YoEi07rgJSiUKyMzFqsZHahkSSf2q0QiRqvfbfJhOmFVlBRpSqq4k/EG9upmIbzV6IO5BCt6KMnoYE0c0ttbQswrDER5BEpyDywUiYzy+Ui5anecpKazRVUmzSsLdRIzXIQo2mcuMr4MZyalKbjLhMbESFfpEJDrkuW9SciibpUW1dUcYiwus8zqzAxGxCDCVlEjQRYeqAQ1GUgrquSNTUQacW8+XTj6NUDyG6wLJ9fX1Mn5/RjG7WBwDHdjZsTIo9KAMpy9fu9Zy/MvMEWnFSEZE1EysCyeoWln6rVi0AajcVC4AQH47keZ8MKzbV+g9DQc7s5I4oVoeEUVhEQSCLEuIDgVBROiSWL1LWxoFSMEtnoNGLiFWmIqJFq87MDDIUSfAHZZ8/IiNaCvEyHeBlmU4FpRDNyQgBhFIpkY/8nxrleks9iUQDkaLUetHqXNaauA6gyw0buvgabXunKTaEtnVv6lnd3Ztdn1XCMLC2ZcP67eGWQHf0ervh2smLmo6atbQiZovAgN3rRWTBb0jN0CDZJEqnLcOsEsV2onNLZHs+tgJAXWHsxmZELcNq0NrRbdNWB/Gsco7reiKTMQlMpVGiOLv5f7STXzM9xbrrzKmcLP1yQipS7pLCOGoyeIfIGAhrpmHdz5gm+8xu1XqRau2AxNDSaWS0c7MW+mbra/f6DHz8y8PixnIv3k1lLtW2mFasEto61zK7KYoqcI6dxlwwYl3mgqEAmFVeaxxNW7Nz7Rxap2GCpOlSc6+9wWs1O/klP1bi/Lhh1xEw7Hqr1OUCLFjFrQBVnrI2d9mCZVghiFGgzGClW7XeXQ3E9KKsDhWj1OPS2+CFVQWfFUa3gKUTHxbml3EVBV8ZwPKrI+Vc5ZKFFiV+jrdeXAMAdIEVV0fd3GL3baLr4Om7tJLkz++U7V9dvYg/RT3xEFg44eRylZe4h10lwtIDnm3j4IuazaUvPbZXHqtsHN9y+tRR2Rj5q3L4tRNP7fnpq8DX9d73Lhxc5roz+t05T8Xj3IvxTw99krh1gD1K9OWXt5xtHlnx8pv6g2/EfuerDmxWPqytH/ptX1DsEy8Pek/ueqGkzj3Qdkl/bvDCPWceKf8Yc+8uGf/FvLjn0du/OXe8//OK4F5cwR7fvfPH0bOdZw9X3TE2MPzsvs77Q2MdldUdjceC7x8aDH1Zt+j1z+5+Zf/KtZfb2iOnL7Encd0ZcfTo2yPfnlhZR5me0Kkd8xbc+cGRfWZ91U5zoOXJp4/Rev35jzaPjb/6Z8n+kYux2Pfr2jyH/8j+0DC4+Pk2NXNf4pndTQ/n5PsbtCvP/fARAAA="
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
    setProdDesc(<ReactGenerator item={item} />);
  }

  const onClickHandlerSeller = async (seller) => {
    if (seller) {
      let allItems = await getItemsFromSeller(seller);
      let comboboxItems = mapItemsFromSellerToComboboxFormat(allItems);
      setSellersItems(comboboxItems)
      alert(`Es konnten erfolgreich ${comboboxItems.length} Produkte geladen werden.`)
    } else {
      alert(`Bei der Eingabe des Nutzernamens ist ein Fehler aufgetreten.`)
    }
  }

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      onClickHandlerSeller(seller)
    }
  }

  const handleChange = (event) => {
    setChecked(!checked);
  }

  const onItemIdChange = (event) => {
    setItemIdForDirectInput(event.target.value)
  }

  const onItemIdKeyDown = (event) => {
    if (event.key === "Enter") {
      onClickHandler(itemIdForDirectInput)
    }
  }

  let searchBar = null;
  if (checked) {
    searchBar =
      <div>
        <SearchBar
          button={true}
          value={seller}
          placeholder={"eBay Nutzernamen eigeben..."}
          iconURL="https://www.materialui.co/materialIcons/action/store_black_144x144.png"
          search_onKeyDown={onKeyDownHandler}
          search_onChange={onChangeHandler}
          search_onClick={() => onClickHandlerSeller(seller)}
        />
        <Combobox
          iconURL="https://www.materialui.co/materialIcons/action/list_black_144x144.png"
          items={sellersItems}
          onChange={onComboBoxChange}
        />
      </div>
  } else {
    searchBar = <div>
      <SearchBar
        button={false}
        value={itemIdForDirectInput}
        placeholder={"eBay Artikelnummer eingeben..."}
        iconURL="https://www.materialui.co/materialIcons/action/search_black_144x144.png"
        search_onKeyDown={onItemIdKeyDown}
        search_onChange={onItemIdChange}
      />
    </div>
  }

  return (
    <div style={{ margin: "24px" }}>
      <Content>
        <Switch
          color="primary"
          checked={checked}
          onChange={handleChange}
        />
        <div style={{ height: "auto", width: "auto", margin: "5px 25% 5px 25%" }}>
          {searchBar}
          <div style={{ textAlign: "center" }}>
            <button onClick={() => onClickHandler(itemId)} style={{ margin: "5px 0 5px 0" }}>
              Produktbeschreibung generieren
          </button>
          </div>
        </div>
        {/* <SearchBar
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
        </div>*/}
        <PreviewContainer
          productDescription={prodDesc} />
      </Content>
    </div>
  );
}

export default app;



// const getAuthToken = () => {
  // var buffer = new Buffer(process.env.PROD_APP_ID__CLIENT_ID + ":" + process.env.PROD_CERT_ID__CLIENT_SECRET);
  // var id_secret_b64 = buffer.toString('base64');

  // var options = {
    // method: 'POST',
    // url: "https://api.ebay.com/identity/v1/oauth2/token",
    // headers:
    // {
      // Authorization: "Basic " + id_secret_b64,
      // 'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // form:
    // {
      // grant_type: 'client_credentials',
      // scope: 'https://api.ebay.com/oauth/api_scope'
    // }
  // };

  // let token = "";
  // request(options, (error, response, body) => {
    // if (error) {
      // throw new Error(error);
    // }
    // console.log(body)
  // });
  // console.log(token)
  // return token
// }