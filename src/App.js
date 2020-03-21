import React, { useState } from 'react';
import ReactGenerator from "./util/ReactGenerator"
import ReactDOMServer from 'react-dom/server';
import eBayApi from "./util/eBayApi";
import Miscellaneous from "./util/Miscellaneous"
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import logo from './logo.png';

const config = require("./config");
const { Switch, Grid, TextField, Select, MenuItem, Button, FormControlLabel, Card, AppBar, Paper, Toolbar, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpandMoreIcon } = require('@material-ui/core');

const firebaseConfig = {
  apiKey: `${config.API_KEY}`,
  authDomain: `${config.AUTH_DOMAIN}`,
  databaseURL: `${config.DATABASE_URL}`,
  projectId: `${config.PROJECT_ID}`,
  storageBucket: `${config.STORAGE_BUCKET}`,
  messagingSenderId: `${config.MESSAGING_SENDER_ID}`,
  appId: `${config.APP_ID}`,
  measurementId: `${config.MEASUREMENT_ID}`
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const app = (props) => {
  const [seller, setSeller] = new useState("");
  const [sellersItems, setSellersItems] = new useState();
  const [productDescription, setProductDescription] = new useState(null);
  const [itemIdDropbox, setItemIdDropbox] = new useState("");
  const [itemIdInput, setItemIdInput] = new useState("");
  const [checked, setChecked] = new useState(false);
  const [regEmail, setRegEmail] = new useState();
  const [regPassword, setRegPassword] = new useState();
  const [logEmail, setLogEmail] = new useState()
  const [logPassword, setLogPassword] = new useState()

  const {
    user,
    signOut
  } = props;

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

  const changeRegEmailHandler = (event) => {
    setRegEmail(event.target.value)
  }

  const changeRegPasswordHandler = (event) => {
    setRegPassword(event.target.value)
  }

  const changeLogEmailHandler = (event) => {
    setLogEmail(event.target.value)
  }

  const changeLogPasswordHandler = (event) => {
    setLogPassword(event.target.value)
  }

  const registerUser = () => {
    firebase.auth().createUserWithEmailAndPassword(regEmail, regPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    })
  }

  const loginUser = () => {
    firebase.auth().signInWithEmailAndPassword(logEmail, logPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
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

  /*return (
    <div style={{ minHeight: "100vh", backgroundColor: "#E2E2E2" }} >
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" crossOrigin="anonymous" />
      {header}
      <div style={{ margin: "5px 2% 5px 2%" }}>
        {toggleSearchbar}
        {searchBar}
        {descriptionContainer}
      </div>
    </div>
  );*/

  return (
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          user
            ? <p>Hello, {user.displayName}</p>
            : <p>Please sign in.</p>
        }
        {
          user
            ? <button onClick={signOut}>Sign out</button>
            : <button onClick={signInWithGoogle}>Sign in with Google</button>
        }
      </header>
    </div>*/
    <div>
      <div>
        <h1>Registrieren</h1>
        <TextField id="standard-basic" value={regEmail} onChange={changeRegEmailHandler} label="E-Mail" /><br/>
        <TextField
            id="standard-password-input"
            value={regPassword}
            onChange={changeRegPasswordHandler}
            label="Passwort"
            type="password"
            autoComplete="current-password"
          /><br/>
        <Button variant="contained" color="primary" onClick={registerUser}>
          Registrieren
        </Button>
      </div>
      <div>
        <h1>Anmelden</h1>
        <TextField id="standard-basic" value={logEmail} onChange={changeLogEmailHandler} label="E-Mail" /><br/>
        <TextField
            id="standard-password-input"
            value={logPassword}
            onChange={changeLogPasswordHandler}
            label="Passwort"
            type="password"
            autoComplete="current-password"
          /><br/>
        <Button variant="contained" color="primary" onClick={loginUser}>
          Anmelden
        </Button>
      </div>
    </div>

  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(app);
