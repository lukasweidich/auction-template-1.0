import React, { useState } from 'react';
import ReactGenerator from "../util/ReactGenerator"
import ReactDOMServer from 'react-dom/server';
import eBayApi from "../util/eBayApi";
import Miscellaneous from "../util/Miscellaneous"
const { FormControl, Paper, ButtonBase, Alert, CircularProgress, Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, AppBar, Toolbar, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } = require('@material-ui/core');
const { Autocomplete } = require('@material-ui/lab');

const templateGenerator = (props) => {
    const [seller, setSeller] = new useState("");
    const [sellersItems, setSellersItems] = new useState();
    const [productDescription, setProductDescription] = new useState(null);
    const [itemIdDropbox, setItemIdDropbox] = new useState("");
    const [itemIdInput, setItemIdInput] = new useState("");
    const [checked, setChecked] = new useState(false);
    const [item, setItem] = new useState();
    const [loadingSellersItems, setLoadingSellersItems] = new useState(false);
    const [loadingItemTemplate, setLoadingItemTemplate] = new useState(false);
    const [selectedItemTemplate, setSelectedItemTemplate] = new useState("dem-it-classic");
    const [itemTemplates, setItemTemplates] = new useState([{ id: "dem-it-classic", name: "dem-IT Classic Template", img: "https://dem-it.de/uploads/unknown.png" }, { id: "nüscht", name: "lol anderes template", img: "https://dem-it.de/uploads/unknown.png" }]);
    const [articleOptions, setArticleOptions] = new useState({
        paymentOptions: [
            { selected: false, name: "Banktransfer", img: "https://template-builder.de/icons/payment/banktransfer.png" },
            { selected: false, name: "DHL COD", img: "https://template-builder.de/icons/payment/dhl-cod.png" },
            { selected: false, name: "DPD COD", img: "https://template-builder.de/icons/payment/dpd-cod.png" },
            { selected: false, name: "Giropay", img: "https://template-builder.de/icons/payment/giropay.png" },
            { selected: false, name: "Hermes COD", img: "https://template-builder.de/icons/payment/hermes-cod.png" },
            { selected: false, name: "Invoice Alternate", img: "https://template-builder.de/icons/payment/invoice-alternate.png" },
            { selected: false, name: "Mastercard", img: "https://template-builder.de/icons/payment/mastercard.png" },
            { selected: false, name: "Payment in Advance", img: "https://template-builder.de/icons/payment/payment-in-advance.png" },
            { selected: false, name: "Payment in Advance Alternate", img: "https://template-builder.de/icons/payment/payment-in-advance-alternate.png" },
            { selected: false, name: "PayPal", img: "https://template-builder.de/icons/payment/paypal.png" },
            { selected: false, name: "Paysafecard", img: "https://template-builder.de/icons/payment/paysafecard.png" },
            { selected: false, name: "Text Barzahlung", img: "https://template-builder.de/icons/payment/text-barzahlung.png" },
            { selected: false, name: "Text Lastschrift", img: "https://template-builder.de/icons/payment/text-lastschrift.png" },
            { selected: false, name: "Text Nachnahme", img: "https://template-builder.de/icons/payment/text-nachnahme.png" },
            { selected: false, name: "Text Rechnung", img: "https://template-builder.de/icons/payment/text-rechnung.png" },
            { selected: false, name: "Text Überweisung", img: "https://template-builder.de/icons/payment/text-ueberweisung.png" },
            { selected: false, name: "Text Vorkasse", img: "https://template-builder.de/icons/payment/text-vorkasse.png" },
            { selected: false, name: "UPS COD", img: "https://template-builder.de/icons/payment/ups-cod.png" },
            { selected: false, name: "Visa", img: "https://template-builder.de/icons/payment/visa.png" },
        ],
        shippingOptions: [
            { selected: false, name: "DHL", img: "https://template-builder.de/icons/shipping/dhl.png" },
            { selected: false, name: "DPD", img: "https://template-builder.de/icons/shipping/dpd.png" },
            { selected: false, name: "FEDEX", img: "https://template-builder.de/icons/shipping/fedex.png" },
            { selected: false, name: "GLS", img: "https://template-builder.de/icons/shipping/gls.png" },
            { selected: false, name: "Hermes", img: "https://template-builder.de/icons/shipping/hermes.png" },
            { selected: false, name: "Pickup", img: "https://template-builder.de/icons/shipping/pickup.png" },
            { selected: false, name: "Post Germany", img: "https://template-builder.de/icons/shipping/post-germany.png" },
            { selected: false, name: "UPS", img: "https://template-builder.de/icons/shipping/ups.png" },
            { selected: false, name: "Worldmap", img: "https://template-builder.de/icons/shipping/worldmap.png" },
        ],
        shipping: "0",
        legalInformation: null
    });

    const onChangeSellerHandler = (event) => {
        setSeller(event.target.value);
    }

    const onClickSellerHandler = async () => {
        setLoadingSellersItems(true)
        setItemIdDropbox("");
        let allItems = await eBayApi.getItemsFromSeller(seller);
        if (allItems.error) {
            setLoadingSellersItems(false)
            alert(`Fehler: ${allItems.error.message._text}`)
        } else {
            let comboboxItems = Miscellaneous.mapItemsFromSellerToComboboxFormat(allItems);
            setSellersItems(comboboxItems)
            setLoadingSellersItems(false)
            alert(`Es konnten ${comboboxItems.length} Artikel erfolgreich geladen werden!`)
        }
    }

    const onKeyDownSellerHandler = (event) => {
        if (event.key === "Enter") {
            onClickSellerHandler(seller)
        }
    }

    // const onChangeItemDropboxHandler = (event) => {
    //     setItemIdDropbox(event.target.value)
    // }

    const onChangeItemDropboxHandler = (event, value, reason) => {
        if (value) {
            setItemIdDropbox(value.value)
        }
    }

    const onChangeItemIdInputHandler = (event) => {
        setItemIdInput(event.target.value)
    }

    const onKeyDownItemIdInputHandler = (event) => {
        if (event.key === "Enter") {
            onClickGenerateDescriptionHandler(itemIdInput)
        }
    }

    const onClickGenerateDescriptionHandler = async (itemId, templateId) => {
        setLoadingItemTemplate(true)
        let itm = await eBayApi.getItemFromItemId(itemId);
        if (itm.errors) {
            setLoadingItemTemplate(false)
            alert(`Fehler: ${itm.errors[0].message}`)
        } else {
            setItem(itm)
            setProductDescription(<ReactGenerator templateId={templateId} item={itm} articleOptions={articleOptions} />);
            setLoadingItemTemplate(false)
        }
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
        setProductDescription(<ReactGenerator item={item} articleOptions={articleOptions} />);
    }

    const onClickDeleteDescriptionHandler = () => {
        setItem({ ...item, shortDescription: null })
    }

    const onClickAddDescriptionHandler = () => {
        setItem({ ...item, shortDescription: "" })
    }

    const onClickPaymentOptionHandler = (index) => {
        let tmp = [...articleOptions.paymentOptions]
        tmp[index] = { ...tmp[index], selected: !tmp[index].selected }
        setArticleOptions({ ...articleOptions, paymentOptions: tmp })
    }

    const onClickShippingOptionHandler = (index) => {
        let tmp = [...articleOptions.shippingOptions]
        tmp[index] = { ...tmp[index], selected: !tmp[index].selected }
        setArticleOptions({ ...articleOptions, shippingOptions: tmp })
    }

    const onChangeShippingHandler = (event) => {
        setArticleOptions({ ...articleOptions, shipping: event.target.value })
    }

    const onChangeLegalInformationHandler = (event) => {
        setArticleOptions({ ...articleOptions, legalInformation: event.target.value })
    }

    const onClickDeleteLegalInformationHandler = () => {
        setArticleOptions({ ...articleOptions, legalInformation: null })
    }

    const onClickAddLegalInformationHandler = () => {
        setArticleOptions({ ...articleOptions, legalInformation: "" })
    }

    const onChangeSelectedItemTemplateHandler = (event) => {
        setSelectedItemTemplate(event.target.value)
    }

    const onClickSelectItemTemplateHandler = (index) => {
        setSelectedItemTemplate(itemTemplates[index].id)
    }
    //###############################################################################################################################################################

    let templateViewer = (
        itemTemplates.map((el, i) => {
            let selectedTemplate = itemTemplates.filter(el => el.id === selectedItemTemplate)
            let selectedIndex = itemTemplates.indexOf(...selectedTemplate);
            return <Paper style={{ margin: "10px", backgroundColor: selectedIndex === i ? "white" : "#D1D1D1" }} onClick={() => onClickSelectItemTemplateHandler(i)}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img style={{ opacity: selectedIndex === i ? "1" : "0.2" }} width="120px" alt="complex" src={el.img} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography style={{ opacity: selectedIndex === i ? "1" : "0.2" }} gutterBottom variant="subtitle2">
                                    {el.name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        })
    )

    let templateSelector = (
        <FormControl style={{ minWidth: "400px" }}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedItemTemplate}
                onChange={onChangeSelectedItemTemplateHandler}
                defaultValue={selectedItemTemplate}
                width="100px"
                labelWidth="200"
                disabled={(!checked ? !(itemIdDropbox > "0") || loadingItemTemplate : !itemIdInput || loadingItemTemplate)}
            >
                {itemTemplates.map(el => {
                    return <MenuItem value={el.id}>{el.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    )

    let templateExpansion = (
        <ExpansionPanel disabled={(!checked ? !(itemIdDropbox > "0") || loadingItemTemplate : !itemIdInput || loadingItemTemplate)} >
            <ExpansionPanelSummary
                expandIcon={<span className="material-icons">
                    expand_more
</span>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">
                    VORLAGEN
  </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: "8px 24px 8px 24px" }}>
                {templateViewer}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

    let searchBar = null;
    if (!checked) {
        searchBar =
            <div>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        {<span className="material-icons">account_circle</span>}
                    </Grid>
                    <Grid item>
                        <TextField size="small" onKeyDown={onKeyDownSellerHandler} value={seller} onChange={onChangeSellerHandler} label="eBay Nutzername" />
                    </Grid>
                    <Grid item>
                        <Button onClick={onClickSellerHandler} disabled={!seller || loadingSellersItems}>Eingeben</Button>
                    </Grid>
                    {loadingSellersItems && <Grid item><CircularProgress size={25} /></Grid>}
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <span className="material-icons">local_offer</span>
                    </Grid>
                    <Grid item>
                        <Autocomplete
                            id="combo-box-demo"
                            getOptionLabel={option => option.value + " - " + option.text}
                            style={{ width: 400 }}
                            renderInput={params => <TextField {...params} />}
                            variant="outlined"
                            size="small"
                            id="select"
                            options={sellersItems ? sellersItems.sort((a, b) => -b.text.localeCompare(a.text)) : null}
                            onChange={onChangeItemDropboxHandler}
                            disabled={!sellersItems}
                        />
                    </Grid>
                </Grid >
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <span class="material-icons">
                            web</span>
                    </Grid>
                    <Grid item>
                        {templateSelector}
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Button onClick={() => onClickGenerateDescriptionHandler(itemIdDropbox, selectedItemTemplate)} disabled={!(itemIdDropbox > "0") || loadingItemTemplate} style={{ marginTop: "5px" }} variant="contained" color="primary">Produktbeschreibung generieren</Button>
                    </Grid>
                    <Grid item>
                        {loadingItemTemplate && <Grid item><CircularProgress size={25} /></Grid>}
                    </Grid>
                </Grid>
            </div >
    } else {
        searchBar = <div>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <span className="material-icons">search</span>
                </Grid>
                <Grid item>
                    <TextField size="small" onKeyDown={onKeyDownItemIdInputHandler} value={itemIdInput} onChange={onChangeItemIdInputHandler} label="eBay Artikelnummer" />
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <span class="material-icons">
                        web</span>
                </Grid>
                <Grid item>
                    {templateSelector}
                </Grid>
                <Grid item>
                    <Button onClick={() => onClickGenerateDescriptionHandler(itemIdInput, selectedItemTemplate)} disabled={!itemIdInput || loadingItemTemplate} style={{ marginTop: "5px" }} variant="contained" color="primary">
                        Produktbeschreibung generieren
  </Button>
                </Grid>
                <Grid item>
                    {loadingItemTemplate && <Grid item><CircularProgress size={25} /></Grid>}
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
        <ExpansionPanel disabled={!productDescription || loadingItemTemplate}>
            <ExpansionPanelSummary
                expandIcon={<span className="material-icons">
                    expand_more
</span>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant="h6">
                    ANSEHEN
          </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: "8px 24px 8px 24px" }}>
                {productDescription ? productDescription : null}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

    let information = (
        item ?
            <div>
                <TextField onChange={(event) => onChangeTitleHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" fullWidth id="outlined-basic" label="Titel" value={item.title} variant="outlined" />
                <TextField onChange={(event) => onChangePriceValueHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Preis" value={item.price.convertedFromValue} variant="outlined" />
                <TextField onChange={(event) => onChangeShippingHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Versandkosten" value={articleOptions.shipping} variant="outlined" ></TextField>
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


    let paymentOptions = (
        item ?
            <div>
                {articleOptions.paymentOptions.map((option, i) => (
                    <div id={i} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <FormControlLabel
                            style={{ margin: "10px 2% 10px 2%" }}
                            control={<Switch color="primary" checked={option.selected} onChange={() => onClickPaymentOptionHandler(i)} />}
                        />
                        <img alt={option.name} onClick={() => onClickPaymentOptionHandler(i)} style={{ objectFit: "scale-down" }} height="60" width="90" src={option.img} />
                    </div>
                ))}
            </div>
            :
            null
    )


    let shippingOptions = (
        item ?
            <div>
                {articleOptions.shippingOptions.map((option, i) => (
                    <div id={i} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <FormControlLabel
                            style={{ margin: "10px 2% 10px 2%" }}
                            control={<Switch color="primary" checked={option.selected} onChange={() => onClickShippingOptionHandler(i)} />}
                        />
                        <img alt={option.name} onClick={() => onClickShippingOptionHandler(i)} style={{ objectFit: "scale-down" }} height="60" width="90" src={option.img} />
                    </div>
                ))}
            </div>
            :
            null
    )

    let legalInformation = (
        item ? (
            articleOptions.legalInformation !== null ?
                <div>
                    <TextField multiline rows="5" onChange={(event) => onChangeLegalInformationHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" fullWidth id="outlined-basic" label="Rechtliche Angaben" value={articleOptions.legalInformation} variant="outlined" />
                    <Button onClick={() => onClickDeleteLegalInformationHandler()} style={{ margin: "10px 2% 10px 2%" }}>LÖSCHEN</Button>
                </div>
                :
                <div>
                    <Button onClick={() => onClickAddLegalInformationHandler()} style={{ margin: "10px 2% 10px 2%" }}>HINZUFÜGEN</Button>
                </div>
        )
            : null
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
                <h1>Bezahlung</h1>
                {paymentOptions}
                <h1>Versand</h1>
                {shippingOptions}
                <h1>Rechtliche Angaben</h1>
                {legalInformation}
                <div>
                    <Button onClick={() => { onClickSaveChangesHandler() }} style={{ margin: "10px 2% 10px 2%" }} variant="contained" color="primary">
                        SPEICHERN
</Button>
                </div>
            </div >
        ) :
            null
    )

    let expansionPanel = (
        <ExpansionPanel disabled={!productDescription || loadingItemTemplate}>
            <ExpansionPanelSummary
                expandIcon={<span className="material-icons">
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
    )

    //###############################################################################################################################################################

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee" }} >
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
            {header}
            <div style={{ margin: "10px 2% 10px 2%" }}>
                {toggleSearchbar}
                {searchBar}
            </div>
            <div style={{ margin: "10px 2% 10px 2%" }}>
                {templateExpansion}
            </div>
            <div style={{ margin: "10px 2% 10px 2%" }}>
                {expansionPanel}
            </div>
            <div style={{ margin: "10px 2% 10px 2%" }}>
                {descriptionContainer}
            </div>
            <div style={{ margin: "10px 2% 10px 2%" }}>
                <Button onClick={() => Miscellaneous.copyToClipboard(ReactDOMServer.renderToStaticMarkup(productDescription))} disabled={!productDescription} style={{ marginTop: "5px" }} variant="contained" color="primary">
                    Produktbeschreibung kopieren
  </Button>
            </div>
        </div>
    );
}

export default templateGenerator;