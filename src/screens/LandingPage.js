import React, { useState } from "react"
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../config';
const { TextField, Button, AppBar, Toolbar, Typography } = require('@material-ui/core');
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const LandingScreen = (props) => {

    const {
        user,
    } = props;

    props.setSignedIn((user ? true : false))

    // 0 = landing, 1 = login, 2 = register
    const [currentScreen, setCurrentScreen] = new useState("0");
    const [logInEmail, setLogInEmail] = new useState();
    const [logInPassword, setLogInPassword] = new useState();
    const [registerEmail, setRegisterEmail] = new useState();
    const [registerPassword, setRegisterPassword] = new useState();

    const onChangeLogInEmail = (event) => {
        setLogInEmail(event.target.value)
    }

    const onChangeLogInPassword = (event) => {
        setLogInPassword(event.target.value)
    }

    const onChangeRegisterEmail = (event) => {
        setRegisterEmail(event.target.value)
    }

    const onChangeRegisterPassword = (event) => {
        setRegisterPassword(event.target.value)
    }

    const onClickLogIn = () => {
        console.log(logInEmail + ":" + logInPassword)
        loginUser();
    }

    const onClickRegister = () => {
        console.log(logInEmail + ":" + logInPassword)
        registerUser();
    }


    const registerUser = () => {
        firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        })
        setCurrentScreen("1")
    }

    const loginUser = () => {
        firebase.auth().signInWithEmailAndPassword(logInEmail, logInPassword).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    let header = (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h6">
                    demIT eBay Description Generator
          </Typography>
            </Toolbar>
        </AppBar>
    )

    let landingPage = (
        <center style={{ marginTop: "25vh" }}>
            <div>
                <img alt="dem-it Logo" style={{ margin: "10px auto 10px auto" }} width={"25%"} src="http://template-builder.de/uploads/template-builder-logo.PNG" />
            </div>
            <div>
                {/* <Button style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="secondary" onClick={() => setCurrentScreen("2")}>REGISTRIEREN</Button> */}
                <Button style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="primary" onClick={() => setCurrentScreen("1")}>ANMELDEN</Button>
                {/* <Button style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="primary" onClick={signInWithGoogle}>ANMELDEN MIT GOOGLE</Button> */}
            </div>
        </center>
    )

    let loginPage = (
        <center style={{ margin: "10%" }}>
            <h1>ANMELDEN</h1>
            <div>
                <TextField onChange={(event) => onChangeLogInEmail(event)} style={{ minWidth: "10%", margin: "10px 2% 10px 2%" }} size="small" label="E-Mail Adresse" value={logInEmail} variant="standard" />
            </div>
            <div>
                <TextField onChange={(event) => onChangeLogInPassword(event)} type="password" style={{ minWidth: "10%", margin: "10px 2% 10px 2%" }} size="small" value={logInPassword} label="Passwort" variant="standard" />
            </div>
            <Button onClick={() => setCurrentScreen("0")} style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="secondary">ZURÜCK</Button>
            <Button onClick={() => onClickLogIn()} style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="primary">ANMELDEN</Button>
        </center>
    )

    let signinPage = (
        <center style={{ margin: "10%" }}>
            <h1>REGISTRIEREN</h1>
            <div>
                <TextField onChange={(event) => onChangeRegisterEmail(event)} style={{ minWidth: "10%", margin: "10px 2% 10px 2%" }} size="small" label="E-Mail Adresse" value={registerEmail} variant="standard" />
            </div>
            <div>
                <TextField onChange={(event) => onChangeRegisterPassword(event)} type="password" style={{ minWidth: "10%", margin: "10px 2% 10px 2%" }} size="small" value={registerPassword} label="Passwort" variant="standard" />
            </div>
            <Button onClick={() => setCurrentScreen("0")} style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="secondary">ZURÜCK</Button>
            <Button onClick={() => onClickRegister()} style={{ margin: "10px", minWidth: "10%" }} variant="contained" color="primary">REGISTRIEREN</Button>
        </center>
    )

    let content = (
        currentScreen === "0" ?
            landingPage
            :
            (currentScreen === "1" ?
                loginPage

                :

                (currentScreen === "2" ?
                    signinPage

                    :

                    null
                )
            )
    )

    return (

        <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee" }} >
            {header}
            {content}
        </div>
    )
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LandingScreen);