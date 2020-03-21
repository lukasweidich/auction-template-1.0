import React, { useState } from 'react';
import ReactGenerator from "./util/ReactGenerator"
import ReactDOMServer from 'react-dom/server';
import eBayApi from "./util/eBayApi";
import Miscellaneous from "./util/Miscellaneous"
const { Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, AppBar, Toolbar, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } = require('@material-ui/core');

const app = (props) => {
  const [seller, setSeller] = new useState("");
  const [sellersItems, setSellersItems] = new useState();
  const [productDescription, setProductDescription] = new useState(null);
  const [itemIdDropbox, setItemIdDropbox] = new useState("");
  const [itemIdInput, setItemIdInput] = new useState("");
  const [checked, setChecked] = new useState(false);
  const [item, setItem] = new useState();

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
    let itm = await eBayApi.getItemFromItemId(itemId);
    setItem(itm)
    setProductDescription(<ReactGenerator item={itm} />);
  }

  const toggleCheckedHandler = (event) => {
    setChecked(!checked);
  }

  const onClickDeleteLocalizedAspectHandler = (index) => {
    let tmp = [...item.localizedAspects]
    tmp.splice(index, 1)
    setItem({ ...item, localizedAspects: tmp })
  }

  const onClickAddLocalizedAspect = () => {
    let tmp = [...item.localizedAspects]
    tmp.push({ name: "", value: "" })
    setItem({ ...item, localizedAspects: tmp })
  }

  const onChangeLocalizedAspectNameHandler = (event, i) => {
    let tmp = [...item.localizedAspects]
    tmp[i] = { ...tmp[i], name: event.target.value }
    setItem({ ...item, localizedAspects: tmp })
  }

  const onChangeLocalizedAspectValueHandler = (event, i) => {
    let tmp = [...item.localizedAspects]
    tmp[i] = { ...tmp[i], value: event.target.value }
    setItem({ ...item, localizedAspects: tmp })
  }

  const onChangeTitleHandler = (event) => {
    setItem({ ...item, title: event.target.value })
  }

  const onChangePriceValueHandler = (event) => {
    setItem({ ...item, price: { ...item.price, convertedFromValue: event.target.value } })
  }

  const onChangePriceCurrencyHandler = (event) => {
    setItem({ ...item, price: { ...item.price, convertedFromCurrency: event.target.value } })
  }

  const onChangeDescriptionHandler = (event) => {
    setItem({ ...item, shortDescription: event.target.value })
  }

  const onClickSaveChangesHandler = () => {
    setProductDescription(<ReactGenerator item={item} />);
  }

  const onClickDeleteDescriptionHandler = () => {
    setItem({ ...item, shortDescription: null })
  }

  const onClickAddDescriptionHandler = () => {
    setItem({ ...item, shortDescription: "" })
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
            <TextField size="small" onKeyDown={onKeyDownSellerHandler} value={seller} onChange={onChangeSellerHandler} label="eBay Nutzername" />
          </Grid>
          <Grid item>
            <Button onClick={onClickSellerHandler} disabled={!seller}>Eingeben</Button>
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
            <Select size="small" labelId="label" id="select" value={itemIdDropbox || "0"} onChange={onChangeItemDropboxHandler} >
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

        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Button onClick={() => onClickGenerateDescriptionHandler(itemIdDropbox)} disabled={!(itemIdDropbox > "0")} style={{ marginTop: "5px" }} variant="contained" color="primary">
              Produktbeschreibung generieren
  </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => Miscellaneous.copyToClipboard(ReactDOMServer.renderToStaticMarkup(productDescription))} disabled={!productDescription} style={{ marginTop: "5px" }} variant="contained" color="primary">
              Produktbeschreibung kopieren
  </Button>
          </Grid>
        </Grid>
      </div>
  } else {
    searchBar = <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <span class="material-icons">search</span>
        </Grid>
        <Grid item>
          <TextField size="small" onKeyDown={onKeyDownItemIdInputHandler} value={itemIdInput} onChange={onChangeItemIdInputHandler} label="eBay Artikelnummer" />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Button onClick={() => onClickGenerateDescriptionHandler(itemIdInput)} disabled={!itemIdInput} style={{ marginTop: "5px" }} variant="contained" color="primary">
            Produktbeschreibung generieren
  </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => Miscellaneous.copyToClipboard(ReactDOMServer.renderToStaticMarkup(productDescription))} disabled={!productDescription} style={{ marginTop: "5px" }} variant="contained" color="primary">
            Produktbeschreibung kopieren
  </Button>
        </Grid>
      </Grid>

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
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography variant="h6">
          demIT eBay Description Generator
          </Typography>
      </Toolbar>
    </AppBar>
  )

  let descriptionContainer = (
    productDescription ?
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<span class="material-icons">
            expand_more
</span>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            ANSEHEN
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {productDescription}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      :
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<span class="material-icons">
            expand_more
          </span>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            ANSEHEN
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {productDescription}
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )

  let information = (
    item ?
      <div>
        <TextField onChange={(event) => onChangeTitleHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" fullWidth id="outlined-basic" label="Titel" value={item.title} variant="outlined" />
        <TextField onChange={(event) => onChangePriceValueHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Preis" value={item.price.convertedFromValue} variant="outlined" />
        <TextField onChange={(event) => onChangePriceCurrencyHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Währung" value={item.price.convertedFromCurrency} variant="outlined" />
      </div>
      : null
  )

  let description = (
    item ? (
      item.shortDescription !== null ?
        <div>
          <TextField multiline rows="5" onChange={(event) => onChangeDescriptionHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" fullWidth id="outlined-basic" label="Beschreibung" value={item.shortDescription} variant="outlined" />
          <Button onClick={() => onClickDeleteDescriptionHandler()} style={{ margin: "10px 2% 10px 2%" }}>LÖSCHEN</Button>
        </div>
        :
        <div>
          <Button onClick={() => onClickAddDescriptionHandler()} style={{ margin: "10px 2% 10px 2%" }}>HINZUFÜGEN</Button>
        </div>
    )
      : null
  )

  let localizedAspects = (
    item ?
      <div>
        {item.localizedAspects.map((aspect, i) => (
          <div id={i}>
            <TextField onChange={(event) => onChangeLocalizedAspectNameHandler(event, i)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Eigenschaft" value={aspect.name} variant="outlined" />
            <TextField onChange={(event) => onChangeLocalizedAspectValueHandler(event, i)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Wert" value={aspect.value} variant="outlined" />
            <Button onClick={() => onClickDeleteLocalizedAspectHandler(i)} style={{ margin: "10px 2% 10px 2%" }}>LÖSCHEN</Button>
          </div>
        ))}
        <Button style={{ margin: "10px 2% 10px 2%" }} onClick={onClickAddLocalizedAspect} >HINZUFÜGEN</Button>
      </div>
      :
      null
  )

  let form = (
    item ? (
      <div width="100%" noValidate autoComplete="off">
        <h1>Informationen</h1>
        {information}
        <h1>Beschreibung</h1>
        {description}
        <h1>Artikelmerkmale</h1>
        {localizedAspects}
        <div>
          <Button onClick={() => { onClickSaveChangesHandler(); console.log("clicked save") }} style={{ margin: "10px 2% 10px 2%" }} variant="contained" color="primary">
            SPEICHERN
</Button>
        </div>
      </div >
    ) :
      null
  )

  let expansionPanel = (
    productDescription ?
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<span class="material-icons">
            expand_more
          </span>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            BEARBEITEN
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {form}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      :
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<span class="material-icons">
            expand_more
          </span>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            BEARBEITEN
          </Typography>
          <Button>
          </Button>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {form}
        </ExpansionPanelDetails>
      </ExpansionPanel>
  )

  //###############################################################################################################################################################

  return (
    <div style={{ minHeight: "100vh" }} >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
      {header}
      <div style={{ margin: "10px 2% 10px 2%" }}>
        {toggleSearchbar}
        {searchBar}
      </div>
      <div style={{ margin: "10px 2% 10px 2%" }}>
        {expansionPanel}
      </div>
      <div style={{ margin: "10px 2% 10px 2%" }}>
        {descriptionContainer}
      </div>
    </div>
  );
}

export default app;