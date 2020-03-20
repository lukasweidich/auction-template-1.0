import React, { useState } from 'react';
import './App.css';
import PreviewContainer from "./components/PreviewContainer"
import URLs from "./constants/MiscAPI"
import ReactGenerator from "./util/ReactGenerator"
import Content from './components/Content';
import { Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, Card, AppBar, Paper, Toolbar, Typography } from '@material-ui/core/';
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

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = "" + str + "";
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const onChangeHandler = (event) => {
    setSeller(event.target.value);
  }

  const onComboBoxChange = (event) => {
    setItemId(event.target.value)
  }

  const getAuthToken = () => {
    return "v^1.1#i^1#f^0#I^3#p^1#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTutttibUtJIFVINXUKAcGZvbO73dkduhsW2tot9LkLxfJo7s7c2Q7dnRnmztBuoqHWBHxQElKDwUcsEfHxA0HkkfDDaDQSohIfERITNBqNEg0SJJDgD+/MlrKtpCDdYBM32Wzm3HPP/c73nXPv3QEDRcWLtzVuu1LmmJE/MgAG8h0OtgQUFxUumVmQP68wD2Q5OEYG5g84Bwt+qcUwldT4DoQ1VcGoqj+VVDBvG4OUqSu8CrGMeQWmEOYNgY+Gm1fxbgbwmq4aqqAmqapIXZBCol8EvnjA7/X6pIAoEKtyPWZMDVJsAHkDEvRAGOcQ5MgwxiaKKNiAihGk3MANaOCh3SDG1vAewLM1jM/LdVFVa5COZVUhLgygQjZa3p6rZ0GdHCnEGOkGCUKFIuGGaGs4UlffEqt1ZcUKjdIQNaBh4vFPK1QRVa2BSRNNvgy2vfmoKQgIY8oVyqwwPigfvg7mDuDbTEPocSOAvFzc6/YKgi8nVDaoegoak+OwLLJIS7YrjxRDNtK3YpSwEd+EBGP0qYWEiNRVWT/tJkzKkoz0IFW/PPxYuK2NCq0yeyHuRDIdQyktCQ1Et3XU0ZIAOTHgRyIdh8gN/VxgdKFMtFGaJ6y0QlVE2SINV7WoxnJEUKOJ3LizuCFOrUqrHpYMC1G2HzfGoafLEjWjomn0KJauKEWIqLIfb63A2GzD0OW4aaCxCBMHbIqI1pomi9TEQbsWR8unHwepHsPQeJerr6+P6fMwqp5wuQFgXWubV0WFHpSClOVr9brtL996Ai3bqQiIzMQyb6Q1gqWf1CoBoCSokBf4Apx/lPfxsEITrf8wZOXsGt8ROesQzufmBFIyHHALHsmfiw4JjRapy8KB4jBNp6DeiwxSpgKiBVJnZgrpssh7aiS3xy8hWvQFJJrseRIdrxF9NCsh0rUoHhcC/v9To9xuqUeRoCMjN7WeqzqX1Fa2E2hS88quwHJ181pTaPZtSrT3LEn0ppvSMge9j3asbNrMdXgTwdvthpsnL6gaalOTspDOBQNWr+eOBY8utkHdSEdRMkkMU0oUW4lOL5Gt+ZgEgJrMWI3NCGrKpUKyo1umbhvxlHIOa1oklTINGE+iSI528/9mJ79pejK560yrnIh+GSFlMXNJYWw1GbxFYHSEVVMn9zOm1TqzY2ovUsgOaOhqMon0NeyUhb7r+mbO9cn4+JeHxZ3lnsObyjSqbSEpkxLqnm6Z3RVFZTjNTmO2xu/lWL+brZlSXitsTWPp6XYONarYQOKkqTkb7uxa7Rr/Hz+UZ3/YQccRMOg4lO9wABdYwFaDh4oKVjsLSudh2UCMDCUGywmF/HfVEdOL0hqU9fwih7Yanl+Q9VZhZAO4f+y9QnEBW5L1kgFU3hgpZMvvKyOUeNyArfGQbxeovjHqZCucc6hH6P0P/7b1aCxSeu500Qdl62eHKkDZmJPDUZjnHHTkhWe/puwYpI5efe/prx5MFz5QXrpl+MzcvUtTZ4fZ4XvbudW7r14ofaPk5LKCDfH+yOUvvAmfOWvj4Ft99dHLT+6s/LLR1/DX7z9/fQhdXPTOzp7yb9/f89LT/IuHl22ctWv79pY/xU2138Sf23PmnnPgxCJm5of0d/vnvH2g9acXhrd+dOmzup6dC0/uW3/uk+PFDrRw3bqOtqci5y8Huio6T+xuurLX+Wb1s75jP+y42jzjj/buWGni1NDnB2vloVNDB44/Lnnn7vv0+5cBc3jX9oZnDpzpXHz2+ZnHDy691tdd8W61a8bcvHUXXm185WR9Ob72qzkyFDw9v3JWSbRs3xOvX/r40o+Vx0T2SNPaixn5/gZYgyIM7xEAAA=="
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
        "Authorization": auth,
        // "SiteId": "77",
        // "ErrorLanguage": "de_DE"
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
      setItemId("");
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
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            {
              itemId > "0" ?
                <span class="material-icons">local_offer</span> :
                <span class="material-icons">label</span>
            }
          </Grid>
          <Grid item>
            <Select labelId="label" id="select" value={itemId || "0"} onChange={onComboBoxChange} >
              {!itemId && sellersItems ?
                <MenuItem value="0">Bitte ein Produkt auswählen</MenuItem> : null}

              {
                sellersItems ?
                  sellersItems.map(item => {
                    return <MenuItem value={item.value}>{item.value} - {item.text}</MenuItem>
                  })
                  :
                  <MenuItem value="0">Bitte einen eBay Nutzernamen eingeben</MenuItem>
              }
            </Select>
          </Grid>
        </Grid>
        <Button onClick={() => onClickHandler(itemId)} disabled={!(itemId > "0")} style={{ margin: "5px" }} variant="contained" color="primary">
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
      <Button onClick={() => onClickHandler(itemIdForDirectInput)} disabled={!itemIdForDirectInput} style={{ margin: "5px" }} variant="contained" color="primary">
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              demIT eBay Description Generator
          </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "5px 2% 5px 2%" }}>
          {toggleSearchbar}
          <div style={{ height: "auto", width: "auto", margin: "5px 0 5px 0" }}>
            {searchBar}
          </div>
          <Card variant={"outlined"} style={{ backgroundColor: "#3F51B5" }} >
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">
                  VORSCHAU
          </Typography>
                <Button onClick={() => copyToClipboard(prodDesc)} color="inherit" style={{ float: "right" }}><span class="material-icons">file_copy</span></Button>
              </Toolbar>
            </AppBar>
            <Paper elevation={"0"} style={{ margin: "1px" }}>
              {prodDesc}
            </Paper>
          </Card>
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