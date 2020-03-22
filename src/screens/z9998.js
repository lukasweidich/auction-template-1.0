import React from 'react';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../config';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App(props) {

    const {
        user,
        signOut,
        signInWithGoogle,
    } = props;

    props.setSignedIn((user ? true : false))

    let header = (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h6">
                    demIT eBay Description Generator
          </Typography>
            </Toolbar>
        </AppBar>
    )

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#eeeeee" }} >
            {header}
            <header className="App-header">
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
        </div >
    );
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App);