import React, { useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
const config = require("../config");
const { TextField, Button } = require('@material-ui/core');
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

const LogInScreen = (props) => {
    const [regEmail, setRegEmail] = new useState();
    const [regPassword, setRegPassword] = new useState();
    const [logEmail, setLogEmail] = new useState()
    const [logPassword, setLogPassword] = new useState()

    const {
        user,
        signOut
    } = props;

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
        firebase.auth().createUserWithEmailAndPassword(regEmail, regPassword).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        })
    }

    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword("lukas.weidich@gmx.de", "dem-it").catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
    return (
        <div>
            <div>
                <h1>Registrieren</h1>
                <TextField id="standard-basic" value={regEmail} onChange={changeRegEmailHandler} label="E-Mail" /><br />
                <TextField
                    id="standard-password-input"
                    value={regPassword}
                    onChange={changeRegPasswordHandler}
                    label="Passwort"
                    type="password"
                    autoComplete="current-password"
                /><br />
                <Button variant="contained" color="primary" onClick={registerUser}>
                    Registrieren
            </Button>
            </div>
            <div>
                <h1>Anmelden</h1>
                <TextField id="standard-basic" value={logEmail} onChange={changeLogEmailHandler} label="E-Mail" /><br />
                <TextField
                    id="standard-password-input"
                    value={logPassword}
                    onChange={changeLogPasswordHandler}
                    label="Passwort"
                    type="password"
                    autoComplete="current-password"
                /><br />
                <Button variant="contained" color="primary" onClick={loginUser}>
                    Anmelden
            </Button>
            </div>
           User: {user ? user.displayName : null}
        </div>

    );
}
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LogInScreen);