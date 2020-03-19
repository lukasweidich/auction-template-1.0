import React, { useState } from 'react';
import './App.css';
import PreviewContainer from "./components/PreviewContainer"
import URLs from "./constants/MiscAPI"
import ReactGenerator from "./util/ReactGenerator"
import Content from './components/Content';
import { Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, Card, AppBar, Paper } from '@material-ui/core/';
require('dotenv').config()
const fetch = require('node-fetch');
const convert = require('xml-js');

const app = (props) => {
  const [seller, setSeller] = new useState("");
  const [sellersItems, setSellersItems] = new useState();
  const [prodDesc, setProdDesc] = new useState();
  const [itemId, setItemId] = new useState("0");
  const [checked, setChecked] = new useState(false);
  const [itemIdForDirectInput, setItemIdForDirectInput] = new useState("");

  const onChangeHandler = (event) => {
    setSeller(event.target.value);
  }

  const onComboBoxChange = (event) => {
    setItemId(event.target.value)
  }

  const getAuthToken = () => {
    return "v^1.1#i^1#r^0#f^0#p^1#I^3#t^H4sIAAAAAAAAAOVYfWwURRTv9a4lUFoNGK0EsS6FKHX3Zm+v97HhzhyUQr9Lr7RYNDC3O3tdure73Z2zPTXhbJAEozFqRJEPiSnEEDWIgFUTEA0BY2qIIZEYxT8UU4hGQIhGBJ3dlnKtpCC9YBPvn8u+efPm936/92ZmF6TzJ89bt2Tdb4WOSbnb0iCd63CwBWByfl5ZkTN3Rl4OyHBwbEuXpl09zoH5JkwoOt+ETF1TTVTSnVBUk7eNISppqLwGTdnkVZhAJo8FPhqpq+U9DOB1Q8OaoClUSVVFiPJyHjHA+oSgKCIEOWJUr4Rs1kIUy3mQKCAyLkkB1gPJuGkmUZVqYqjiEOUBHkADjmaDzWyA9wKeA4zPV95GlbQgw5Q1lbgwgArbaHl7rpEBdWyk0DSRgUkQKlwVqYw2RKoqFtU3z3dnxAoP0RDFECfNkU8LNRGVtEAlicZexrS9+WhSEJBpUu7w4Aojg/KRK2BuAr7NtD/AiqIfAsDGOOSNgaxQWakZCYjHxmFZZJGWbFceqVjGqesxStiIrUYCHnqqJyGqKkqsv6VJqMiSjIwQtWhB5OFIYyMVrk12QLMVyXQzSugKxIhubKqgJQH6xWAAiXQMIg8M+INDCw1GG6J51EoLNVWULdLMknoNL0AENRrNDZfBDXFqUBuMiIQtRBl+HnCFw/JAmyXqoIpJ3K5auqIEIaLEfry+AsOzMTbkWBKj4QijB2yKQhTUdVmkRg/atThUPt1miGrHWOfd7q6uLqaLYzQj7vaQ6nAvr6uNCu0oQZqN+Fq9bvvL159Ay3YqAiIzTZnHKZ1g6Sa1SgCocSrsBb6gPzDE+0hY4dHWfxgycnaP7IhsdYjPj1gP5wP+AFdOCicbDRIeqlG3BQPFYIpOQKMDYVKlAqIFUmbJBDJkkefKJQ8XkBAt+oIS7SXbHR0rF300KyEEEIrFhGDg/9QnN1rpUSQYCGen1LNV5pLWwLYCXaqraQsu0DqXJ4U63+r40vayeEeqOiX7oXdxU011p7/JGw/daDNcO3lB01GjpshCKisMWL2eNRY4Q2yEBk5FkaIQw7gSNa1EJ5bI1nyTBIC6zFiNzQhawq1BsqFbppU24nHlHNH1qkQiiWFMQVVZ2sz/m438munJ5KozoXIi+g0KKYuDdxTGVpMxHxMYA5la0iDXM6bBOrKbtQ6kkh0QG5qiIKOFHbfQt15fq9fH5ONfHhY3l3sWLyoTqLYFRSYltHKiZXZLFJXhBDuN2fKA10deMzkwrrwW2po2pybaObREMzESx07NteimbtXuka/44Rz7x/Y49oIex7u5DgdwgznsbHBfvnOZyzl1hiljxMhQYkw5rpJXVwMxHSilQ9nIzXfoy+DpORkfFbY9CoqHPytMdrIFGd8YwMyrI3nsbXcVEko4NsgGvIADbWD21VEXe6frjhxUnrfVU/fkmr4d7dNOzn3k6Ikjl0HhsJPDkZfj6nHk5Ep7Zp1Ln1pc8PTB7c/fPuUe5cSDB2b2FR7QXnJuWMtx/f1lZ85VFp9avats49G9LW8d/2xf76SHLvl9Uaa6c8XPrk2S3P7TU7v3f4PCxaVnzn11sMD53cX503K2TC2q+egF5/K5+y48U7zq9/v79+/euZU+9kD9DzVHWs+mD7EHeg//cnzz2t4Tn76ZjnYefkZ4hT32eSl7uffDvPjcuPDBir7enaumn2TB+o+/r/nz9Zd/DRRufm9q17wLA69+cuQduGGge+PdtP7211P6W+pWVL9fe/74ptf6ik5vuZjfeOiv9ef3fDv9EFO6/fEnvnx2145Lk6hZ54u2/6hcqHxuzb07462lc178A58deOOLKacH5fsb+hlOiO4RAAA="
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

  const onClickHandlerSeller = async () => {
    if (seller) {
      console.log(seller)
      let allItems = await getItemsFromSeller(seller);
      console.log(allItems)
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
  if (!checked) {
    searchBar =
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <span class="material-icons">account_circle</span>
          </Grid>
          <Grid item>
            <TextField onKeyDown={onKeyDownHandler} value={seller} onChange={onChangeHandler} label="eBay Nutzername" />
          </Grid>
          <Grid item>
            <Button onClick={onClickHandlerSeller} color="secondary">Eingeben</Button>
          </Grid>
          <Grid item>
            <span class="material-icons">list</span>
          </Grid>
          <Grid item>
            <Select labelId="label" id="select" defaultValue={sellersItems ? sellersItems[0].value : "0"} onChange={onComboBoxChange} >
              <MenuItem value="0"></MenuItem>
              {
                sellersItems ?
                  sellersItems.map(item => {
                    return <MenuItem value={item.value}>{item.value} - {item.text}</MenuItem>
                  }) :
                  null
              }
            </Select>
          </Grid>
        </Grid>
        <Button onClick={() => onClickHandler(itemId)} style={{ margin: "5px" }} variant="contained" color="primary">
          Produktbeschreibung generieren
  </Button>
      </div>
  } else {
    searchBar = <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <span class="material-icons">search</span>
        </Grid>
        <Grid item>
          <TextField onKeyDown={onItemIdKeyDown} value={itemIdForDirectInput} onChange={onItemIdChange} label="eBay Artikelnummer" />
        </Grid>
      </Grid>
      <Button onClick={() => onClickHandler(itemIdForDirectInput)} style={{ margin: "5px" }} variant="contained" color="primary">
        Produktbeschreibung generieren
  </Button>
    </div>
  }


  let toggleSearchbar = (
    <FormControlLabel
      control={<Switch
        color="primary"
        checked={checked}
        onChange={handleChange}
      />}
      label="Ich kenne die eBay Artikelnummer meines Artikels"
    />
  )

  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body>
        <div style={{ margin: "24px" }}>
          <Content>
            <div style={{ height: "auto", width: "auto", margin: "5px 5% 0px 5%" }}>
              {toggleSearchbar}
              {searchBar}
            </div>
            {/* <PreviewContainer
              productDescription={prodDesc} /> */}

            <Card>
              <AppBar variant={"contained"} color={"secondary"} position="static">
                <Button color="inherit">Kopieren</Button>
              </AppBar>
              <Paper>
                <PreviewContainer
                  productDescription={prodDesc} />
              </Paper>
            </Card>
          </Content>
        </div>
      </body>
    </html>
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