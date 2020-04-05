import React, { useState } from 'react';
import ReactGenerator from "../util/ReactGenerator"
import ReactDOMServer from 'react-dom/server';
import eBayApi from "../util/eBayApi";
import config from "../config";
import Miscellaneous from "../util/Miscellaneous"
import ButtonColorPicker from "../components/ButtonColorPicker"
const { FormControl, Paper, CircularProgress, Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, AppBar, Toolbar, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } = require('@material-ui/core');
const { Autocomplete } = require('@material-ui/lab');

const header = (
    <AppBar color="primary" position="static">
        <Toolbar>
            <Typography variant="h6">
                demIT eBay Description Generator
  </Typography>
        </Toolbar>
    </AppBar>
)

const templateGenerator = (props) => {
    if (props.templates && props.templates != null && props.templates.length > 0) {
        const colors = ['#EAEAEA', '#483D3F', '#B78E4B', '#F25C54', '#628395']
        const [seller, setSeller] = new useState("");
        const [sellersItems, setSellersItems] = new useState();
        const [productDescription, setProductDescription] = new useState();
        const [itemIdDropbox, setItemIdDropbox] = new useState("");
        const [itemIdInput, setItemIdInput] = new useState("");
        const [checked, setChecked] = new useState(false);
        const [item, setItem] = new useState();
        const [loadingSellersItems, setLoadingSellersItems] = new useState(false);
        const [loadingItemTemplate, setLoadingItemTemplate] = new useState(false);
        const [selectedItemTemplate, setSelectedItemTemplate] = new useState(props.templates[0] ? props.templates[0].id : "");
        const [templateColorScheme, setTemplateColorScheme] = new useState(props.templates[0] ? props.templates[0].colors : null);
        const [articleOptions, setArticleOptions] = new useState({
            paymentOptions: [
                { ebayName: "MoneyXferAccepted", selected: false, name: "Banktransfer", img: "https://template-builder.de/icons/payment/banktransfer.png" },
                { ebayName: "COD", selected: false, name: "DHL COD", img: "https://template-builder.de/icons/payment/dhl-cod.png" },
                { ebayName: "COD", selected: false, name: "DPD COD", img: "https://template-builder.de/icons/payment/dpd-cod.png" },
                { ebayName: "", selected: false, name: "Giropay", img: "https://template-builder.de/icons/payment/giropay.png" },
                { ebayName: "COD", selected: false, name: "Hermes COD", img: "https://template-builder.de/icons/payment/hermes-cod.png" },
                { ebayName: "", selected: false, name: "Invoice Alternate", img: "https://template-builder.de/icons/payment/invoice-alternate.png" },
                { ebayName: "CreditCard", selected: false, name: "Mastercard", img: "https://template-builder.de/icons/payment/mastercard.png" },
                { ebayName: "", selected: false, name: "Payment in Advance", img: "https://template-builder.de/icons/payment/payment-in-advance.png" },
                { ebayName: "", selected: false, name: "Payment in Advance Alternate", img: "https://template-builder.de/icons/payment/payment-in-advance-alternate.png" },
                { ebayName: "PayPal", selected: false, name: "PayPal", img: "https://template-builder.de/icons/payment/paypal.png" },
                { ebayName: "CashOnPickup", selected: false, name: "Text Barzahlung", img: "https://template-builder.de/icons/payment/text-barzahlung.png" },
                { ebayName: "", selected: false, name: "Text Lastschrift", img: "https://template-builder.de/icons/payment/text-lastschrift.png" },
                { ebayName: "", selected: false, name: "Text Nachnahme", img: "https://template-builder.de/icons/payment/text-nachnahme.png" },
                { ebayName: "", selected: false, name: "Text Rechnung", img: "https://template-builder.de/icons/payment/text-rechnung.png" },
                { ebayName: "MoneyXferAccepted", selected: false, name: "Text Überweisung", img: "https://template-builder.de/icons/payment/text-ueberweisung.png" },
                { ebayName: "", selected: false, name: "Text Vorkasse", img: "https://template-builder.de/icons/payment/text-vorkasse.png" },
                { ebayName: "COD", selected: false, name: "UPS COD", img: "https://template-builder.de/icons/payment/ups-cod.png" },
                { ebayName: "CreditCard", selected: false, name: "Visa", img: "https://template-builder.de/icons/payment/visa.png" },
            ],
            shippingOptions: [
                { id: "", selected: false, name: "DHL", img: "https://template-builder.de/icons/shipping/dhl.png" },
                { id: "", selected: false, name: "DPD", img: "https://template-builder.de/icons/shipping/dpd.png" },
                { id: "", selected: false, name: "FEDEX", img: "https://template-builder.de/icons/shipping/fedex.png" },
                { id: "", selected: false, name: "GLS", img: "https://template-builder.de/icons/shipping/gls.png" },
                { id: "", selected: false, name: "Hermes", img: "https://template-builder.de/icons/shipping/hermes.png" },
                { id: "", selected: false, name: "Pickup", img: "https://template-builder.de/icons/shipping/pickup.png" },
                { id: "", selected: false, name: "Post Germany", img: "https://template-builder.de/icons/shipping/post-germany.png" },
                { id: "", selected: false, name: "UPS", img: "https://template-builder.de/icons/shipping/ups.png" },
                { id: "global", selected: false, name: "Worldmap", img: "https://template-builder.de/icons/shipping/worldmap.png" },
            ],
            legalInformation: null
        });

        const onChangePrimaryColorPickerHandler = (color) => {
            setTemplateColorScheme({ ...templateColorScheme, primary: color });
        }
        const onChangeSecondaryColorPickerHandler = (color) => {
            setTemplateColorScheme({ ...templateColorScheme, secondary: color });
        }
        const onChangeTitleTextColorPickerHandler = (color) => {
            setTemplateColorScheme({ ...templateColorScheme, title: color });
        }
        const onChangeTextColorPickerHandler = (color) => {
            setTemplateColorScheme({ ...templateColorScheme, text: color });
        }

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
                alert(`${comboboxItems.length} Artikel konnten erfolgreich geladen werden`)
            }
        }

        const onKeyDownSellerHandler = (event) => {
            if (event.key === "Enter") {
                onClickSellerHandler(seller)
            }
        }

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
                onClickGenerateDescriptionHandler(itemIdInput, selectedItemTemplate)
            }
        }

        const onClickGenerateDescriptionHandler = async (itemId, templateId) => {
            setLoadingItemTemplate(true)
            const { GetSingleItemResponse } = await eBayApi.getItemFromItemId(itemId);
            const { Ack } = GetSingleItemResponse;
            if (Ack._text === config.ACK_SUCCESS) {
                setItem(GetSingleItemResponse.Item)
                mapItemPaymentToArticleOptionPayment(GetSingleItemResponse.Item);
                setProductDescription(<ReactGenerator colors={templateColorScheme} templateId={templateId} item={GetSingleItemResponse.Item} articleOptions={articleOptions} />);
                alert(`Die Auktionsvorlage des Artikels konnte erfolgreich geladen werden`)
            } else if (Ack._text === config.ACK_FAILURE) {
                alert(`Fehler: ${GetSingleItemResponse.Errors.LongMessage._text}`)
            }
            setLoadingItemTemplate(false)
        }

        const toggleCheckedHandler = (event) => {
            setChecked(!checked);
        }

        const onClickDeleteLocalizedAspectHandler = (index) => {
            if (Array.isArray(item.ItemSpecifics.NameValueList)) {
                let tmp = [...item.ItemSpecifics.NameValueList]
                tmp.splice(index, 1)
                setItem({ ...item, ItemSpecifics: { ...item.ItemSpecifics, NameValueList: tmp } })
            } else {
                setItem({ ...item, ItemSpecifics: { ...item.ItemSpecifics, NameValueList: [] } })
            }
        }

        const onClickAddLocalizedAspect = () => {
            if (Array.isArray(item.ItemSpecifics.NameValueList)) {
                let tmp = [...item.ItemSpecifics.NameValueList]
                tmp.push({ Name: { _text: "" }, Value: { _text: "" } })
                setItem({ ...item, ItemSpecifics: { ...item.ItemSpecifics, NameValueList: tmp } })
            } else {
                let tmp = item.ItemSpecifics.NameValueList;
                let x = [];
                x.push(tmp);
                x.push({ Name: { _text: "" }, Value: { _text: "" } })
                setItem({ ...item, ItemSpecifics: { ...item.ItemSpecifics, NameValueList: x } })
            }
        }

        const onChangeLocalizedAspectNameHandler = (event, i) => {
            if (Array.isArray(item.ItemSpecifics.NameValueList)) {
                let tmp = [...item.ItemSpecifics.NameValueList]
                tmp[i] = { ...tmp[i], Name: { _text: event.target.value } }
                setItem({ ...item, ItemSpecifics: { NameValueList: tmp } })
            } else {
                let tmp = item.ItemSpecifics.NameValueList;
                tmp = { ...tmp, Name: { _text: event.target.value } }
                setItem({ ...item, ItemSpecifics: { ...item.ItemSpecifics, NameValueList: tmp } })
            }
        }

        const onChangeLocalizedAspectValueHandler = (event, i) => {
            if (Array.isArray(item.ItemSpecifics.NameValueList)) {
                let tmp = [...item.ItemSpecifics.NameValueList]
                tmp[i] = { ...tmp[i], Value: { _text: event.target.value } }
                setItem({ ...item, ItemSpecifics: { NameValueList: tmp } })
            } else {
                let tmp = item.ItemSpecifics.NameValueList;
                tmp = { ...tmp, Value: { _text: event.target.value } }
                setItem({ ...item, ItemSpecifics: { ...item.ItemSpecifics, NameValueList: tmp } })
            }
        }

        const onChangeTitleHandler = (event) => {
            setItem({ ...item, Title: { _text: event.target.value } })
        }

        const onChangePriceValueHandler = (event) => {
            setItem({ ...item, CurrentPrice: { ...item.CurrentPrice, _text: event.target.value } })
        }

        const onChangePriceCurrencyHandler = (event) => {
            setItem({ ...item, CurrentPrice: { ...item.CurrentPrice, _attributes: { currencyID: event.target.value } } })
        }

        const onChangeDescriptionHandler = (event) => {
            setItem({ ...item, Description: { _text: event.target.value } })
        }

        const onClickSaveChangesHandler = () => {
            setProductDescription(<ReactGenerator colors={templateColorScheme} templateId={selectedItemTemplate} item={item} articleOptions={articleOptions} />);
        }

        const onClickDeleteDescriptionHandler = () => {
            setItem({ ...item, Description: { _text: null } })
        }

        const onClickAddDescriptionHandler = () => {
            setItem({ ...item, Description: { _text: "" } })
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
            setItem({ ...item, ShippingCostSummary: { ShippingServiceCost: { _text: event.target.value } } });
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
            let selected = props.templates.find((el) => {
                return el.id === event.target.value;
            })
            setTemplateColorScheme(selected.colors);
        }

        const onClickSelectItemTemplateHandler = (index) => {
            setSelectedItemTemplate(props.templates[index].id)
            setTemplateColorScheme(props.templates[index].colors);
        }

        const mapItemPaymentToArticleOptionPayment = (itemInput) => {
            if (itemInput) {
                let paymentOptions = itemInput.PaymentMethods.map(el => el._text)
                let tmpPayment = [...articleOptions.paymentOptions]
                tmpPayment.forEach(el => { if (paymentOptions.includes(el.ebayName)) { el.selected = true } })

                let tmpShipping = [...articleOptions.shippingOptions]
                tmpShipping = tmpShipping.map(el => {
                    if (el.id === "global") {
                        el = { ...el, selected: itemInput.GlobalShipping._text == "true" };
                        return el;
                    } else {
                        return el;
                    }
                })

                setArticleOptions({ ...articleOptions, paymentOptions: tmpPayment, shippingOptions: tmpShipping })
            }
        }
        //###############################################################################################################################################################

        let templateViewer = (
            < div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                {
                    props.templates.map((el, i) => {
                        let selectedTemplate = props.templates.filter(el => el.id === selectedItemTemplate)
                        let selectedIndex = props.templates.indexOf(...selectedTemplate);
                        return (
                            <Paper style={{ margin: "10px", backgroundColor: selectedIndex === i ? "white" : "#D1D1D1", opacity: selectedIndex === i ? "1" : "0.2" }} onClick={() => onClickSelectItemTemplateHandler(i)}>
                                <Grid item>
                                    <img width="120px" alt="complex" src={el.img} />
                                </Grid>
                                <Grid item >
                                    <center>
                                        {el.name}
                                    </center>
                                </Grid>
                            </Paper>
                        )
                    })
                }
            </div >
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
                >
                    {props.templates.map(el => {
                        return <MenuItem value={el.id}>{el.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        )
        let colorPickers = (
            <Grid container>
                <Grid item xs={12}>
                    <ButtonColorPicker
                        colors={colors}
                        triangle="hide"
                        templateColor={templateColorScheme.primary}
                        onChangeComplete={onChangePrimaryColorPickerHandler}
                        text="Farbe Header" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonColorPicker
                        colors={colors}
                        triangle="hide"
                        templateColor={templateColorScheme.title}
                        onChangeComplete={onChangeTitleTextColorPickerHandler}
                        text="Textfarbe Header" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonColorPicker
                        colors={colors}
                        triangle="hide"
                        templateColor={templateColorScheme.secondary}
                        onChangeComplete={onChangeSecondaryColorPickerHandler}
                        text="Hintergrundfarbe" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonColorPicker
                        colors={colors}
                        triangle="hide"
                        templateColor={templateColorScheme.text}
                        onChangeComplete={onChangeTextColorPickerHandler}
                        text="Textfarbe" />
                </Grid>
                <Grid item style={{ float: "right" }}>
                    <Button style={{ margin: "2px", float: "right" }} variant="contained" color="primary" disabled={!productDescription || loadingItemTemplate} onClick={() => setProductDescription(<ReactGenerator colors={templateColorScheme} templateId={selectedItemTemplate} item={item} articleOptions={articleOptions} />)}>aktualisieren</Button>
                </Grid>
            </Grid >
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
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Button onClick={() => onClickGenerateDescriptionHandler(itemIdInput, selectedItemTemplate)} disabled={!itemIdInput || loadingItemTemplate} style={{ marginTop: "5px" }} variant="contained" color="primary">Produktbeschreibung generieren</Button>
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

        let descriptionContainer = (
            //todo: somehow remove pointer cursor 
            <ExpansionPanel style={{ cursor: "default!important" }} expanded disabled={loadingItemTemplate}>
                <ExpansionPanelSummary
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
                    <TextField onChange={(event) => onChangeTitleHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" fullWidth id="outlined-basic" label="Titel" value={item.Title._text} variant="outlined" />
                    <TextField onChange={(event) => onChangePriceValueHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Preis" value={item.CurrentPrice._text} variant="outlined" />
                    <TextField onChange={(event) => onChangeShippingHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Versandkosten" value={item.ShippingCostSummary.ShippingServiceCost._text} variant="outlined" ></TextField>
                    <TextField onChange={(event) => onChangePriceCurrencyHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Währung" value={item.CurrentPrice._attributes.currencyID} variant="outlined" />
                </div>
                : null
        )

        let description = (
            item ? (
                item.Description._text !== null ?
                    <div>
                        <TextField multiline rows="5" onChange={(event) => onChangeDescriptionHandler(event)} style={{ margin: "10px 2% 10px 2%" }} size="small" fullWidth id="outlined-basic" label="Beschreibung" value={item.Description._text} variant="outlined" />
                        <Button onClick={() => onClickDeleteDescriptionHandler()} style={{ margin: "10px 2% 10px 2%" }}>LÖSCHEN</Button>
                    </div>
                    :
                    <div>
                        <Button onClick={() => onClickAddDescriptionHandler()} style={{ margin: "10px 2% 10px 2%" }}>HINZUFÜGEN</Button>
                    </div>
            )
                : null
        )

        let aspects = (item ?
            Array.isArray(item.ItemSpecifics.NameValueList) ?
                item.ItemSpecifics.NameValueList.map(el => el = { name: el.Name._text, value: el.Value._text === "" ? el.Value._text : el.Value._text || el.Value.map(el => el._text).join(", ") })
                :
                (item.ItemSpecifics.NameValueList ?
                    [{ name: item.ItemSpecifics.NameValueList.Name._text, value: item.ItemSpecifics.NameValueList.Value._text }].map(el => el)
                    : [])
            : null)

        let localizedAspects = (
            item ?
                <div>
                    {aspects.map((aspect, i) => (
                        <div id={i}>
                            <TextField onChange={(event) => onChangeLocalizedAspectNameHandler(event, i)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Eigenschaft" value={aspect.name} variant="outlined" />
                            <TextField onChange={(event) => onChangeLocalizedAspectValueHandler(event, i)} style={{ margin: "10px 2% 10px 2%" }} size="small" id="outlined-basic" label="Wert" value={Array.isArray(aspect.value) ? aspect.value.map(el => el._text).join(", ") : aspect.value} variant="outlined" />
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
                <Grid container>
                    {articleOptions.paymentOptions.map((option, i) => (
                        <Grid item xs={6}>
                            <div id={i} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <FormControlLabel
                                    style={{ margin: "10px 2% 10px 2%" }}
                                    control={<Switch color="primary" checked={option.selected} onChange={() => onClickPaymentOptionHandler(i)} />}
                                />
                                <img alt={option.name} onClick={() => onClickPaymentOptionHandler(i)} style={{ objectFit: "scale-down" }} height="60" width="90" src={option.img} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
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
                <Grid container spacing={3}>
                    <div width="100%" noValidate autoComplete="off">
                        <Grid item xs={11}>
                            <h1>Informationen</h1>
                            {information}
                        </Grid>
                        <Grid item xs={11}>
                            <h1>Beschreibung</h1>
                            {description}
                        </Grid>
                        <Grid item xs={11}>
                            <h1>Artikelmerkmale</h1>
                            {localizedAspects}
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <h1>Bezahlung</h1>
                                {paymentOptions}
                            </Grid>
                            <Grid item xs={4}>
                                <h1>Versand</h1>
                                {shippingOptions}
                            </Grid>
                        </Grid>
                        <Grid item xs={11}>
                            <h1>Rechtliche Angaben</h1>
                            {legalInformation}
                        </Grid>
                        <Grid item xs={11}>
                            <div>
                                <Button onClick={() => { onClickSaveChangesHandler() }} style={{ margin: "10px 2% 10px 2%" }} variant="contained" color="primary">
                                    SPEICHERN</Button>
                            </div>
                        </Grid>
                    </div >
                </Grid >
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


        let templateInputContainer = (
            < Grid container spacing={3} >
                <Grid item xs={6}>
                    {colorPickers}
                </Grid>
                <Grid item xs={6}>
                    {templateViewer}
                </Grid>
            </Grid >
        )
        let inputContainer = (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    {toggleSearchbar}
                    {searchBar}
                </Grid>
                <Grid item xs={3}>
                    {templateInputContainer}
                </Grid>
            </Grid>
        )

        //###############################################################################################################################################################

        return (
            props.templates && props.templates.length > 0 ?
                <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee" }} >
                    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
                    <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template.css" />
                    <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
                    {header}
                    <div style={{ margin: "10px 2% 10px 2%" }}>
                        {inputContainer}
                    </div>
                    {/* <div style={{ margin: "10px 2% 10px 2%" }}>
                {templateExpansion}
            </div> */}
                    {productDescription &&
                        <div>
                            <div style={{ margin: "10px 2% 10px 2%" }}>
                                {expansionPanel}
                            </div>
                            <div style={{ margin: "10px 2% 10px 2%" }}>
                                {descriptionContainer}
                            </div>
                            <div style={{ margin: "10px 2% 10px 2%", position: "fixed", bottom: "0", right: "0", padding: "35px", boxShadow: "", zIndex: "99999" }}>
                                <Button onClick={() => Miscellaneous.copyToClipboard(ReactDOMServer.renderToStaticMarkup(productDescription))} disabled={!productDescription} style={{ marginTop: "5px" }} variant="contained" color="secondary">
                                    Produktbeschreibung kopieren
  </Button>
                            </div>
                        </div>}
                </div>
                :
                <div>
                    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
                    <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template.css" />
                    <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
                    {header}
                    <div style={{ height: "100vh", backgroundColor: "#eeeeee", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress></CircularProgress>
                    </div>
                </div>
        );
    } else {
        return <div>
            <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
            <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/template.css" />
            <link rel="stylesheet" type="text/css" href="https://template-builder.de/css/slider.css" />
            {header}
            <div style={{ height: "100vh", backgroundColor: "#eeeeee", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress></CircularProgress>
            </div>
        </div>
    }
}

export default templateGenerator;