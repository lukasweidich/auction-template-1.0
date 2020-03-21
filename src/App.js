import React, { useState } from 'react';
import ReactGenerator from "./util/ReactGenerator"
import ReactDOMServer from 'react-dom/server';
import eBayApi from "./util/eBayApi";
import Miscellaneous from "./util/Miscellaneous"
const { Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, Card, AppBar, Paper, Toolbar, Typography } = require('@material-ui/core');

const app = (props) => {
  const [seller, setSeller] = new useState("");
  const [sellersItems, setSellersItems] = new useState();
  const [productDescription, setProductDescription] = new useState(null);
  const [itemIdDropbox, setItemIdDropbox] = new useState("");
  const [itemIdInput, setItemIdInput] = new useState("");
  const [checked, setChecked] = new useState(false);

  const onChangeSellerHandler = (event) => {
    setSeller(event.target.value);
  }

  const onClickSellerHandler = async () => {
    setItemIdDropbox("");
    let allItems = await eBayApi.getItemsFromSeller(seller);
    let comboboxItems = Miscellaneous.mapItemsFromSellerToComboboxFormat(allItems);
    setSellersItems(comboboxItems)
  }

  const onKeyDownSellerHandler = (event) => {
    if (event.key === "Enter") {
      onClickSellerHandler(seller)
    }
  }

  const onChangeItemDropboxHandler = (event) => {
    setItemIdDropbox(event.target.value)
  }

  const onChangeItemIdInputHandler = (event) => {
    setItemIdInput(event.target.value)
  }

  const onKeyDownItemIdInputHandler = (event) => {
    if (event.key === "Enter") {
      onClickGenerateDescriptionHandler(itemIdInput)
    }
  }

  const onClickGenerateDescriptionHandler = async (itemId) => {
    let item = await eBayApi.getItemFromItemId(itemId);
    setProductDescription(<ReactGenerator item={item} />);
  }

  const toggleCheckedHandler = (event) => {
    setChecked(!checked);
  }

  //###############################################################################################################################################################

  let searchBar = null;
  if (!checked) {
    searchBar =
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <span class="material-icons">account_circle</span>
          </Grid>
          <Grid item>
            <TextField onKeyDown={onKeyDownSellerHandler} value={seller} onChange={onChangeSellerHandler} label="eBay Nutzername" />
          </Grid>
          <Grid item>
            <Button onClick={onClickSellerHandler} disabled={!seller} variant="outlined" color="primary">Eingeben</Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            {
              itemIdDropbox > "0" ?
                <span class="material-icons">local_offer</span> :
                <span class="material-icons">label</span>
            }
          </Grid>
          <Grid item>
            <Select labelId="label" id="select" value={itemIdDropbox || "0"} onChange={onChangeItemDropboxHandler} >
              {!itemIdDropbox && sellersItems ?
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
        <Button onClick={() => onClickGenerateDescriptionHandler(itemIdDropbox)} disabled={!(itemIdDropbox > "0")} style={{ margin: "5px" }} variant="contained" color="primary">
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
          <TextField onKeyDown={onKeyDownItemIdInputHandler} value={itemIdInput} onChange={onChangeItemIdInputHandler} label="eBay Artikelnummer" />
        </Grid>
      </Grid>
      <Button onClick={() => onClickGenerateDescriptionHandler(itemIdInput)} disabled={!itemIdInput} style={{ margin: "5px" }} variant="contained" color="primary">
        Produktbeschreibung generieren
  </Button>
    </div>
  }

  let toggleSearchbar = (
    <FormControlLabel
      control={<Switch
        color="primary"
        checked={checked}
        onChange={toggleCheckedHandler}
      />}
      label="Ich kenne die eBay Artikelnummer meines Artikels"
    />
  )

  let header = (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          demIT eBay Description Generator
          </Typography>
      </Toolbar>
    </AppBar>
  )

  let descriptionContainer = (
    <Card variant={"outlined"} style={{ backgroundColor: "#3F51B5" }} >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            VORSCHAU
          </Typography>
          <Button onClick={() => Miscellaneous.copyToClipboard(ReactDOMServer.renderToStaticMarkup(productDescription))} color="inherit" style={{ float: "right" }}><span class="material-icons">file_copy</span></Button>
        </Toolbar>
      </AppBar>
      <Paper style={{ margin: "1px" }}>
        {productDescription}
      </Paper>
    </Card>
  )

  //###############################################################################################################################################################

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E2E2E2" }} >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
      {header}
      <div style={{ margin: "5px 2% 5px 2%" }}>
        {toggleSearchbar}
        {searchBar}
        {descriptionContainer}
      </div>
    </div>
  );
}

export default app;