import React, { useState } from 'react';
import TemplateGenerator from "./screens/TemplateGenerator"
import LogInPage from "./screens/LogInPage"
import LandingPage from "./screens/LandingPage"
import FAQScreen from "./screens/FAQScreen"
import TemplatesScreen from "./screens/TemplatesScreen"
import TemplateDetail from "./screens/TemplateDetail"
import ProductPage from "./screens/ProductPage"
import HowToScreen from "./screens/HowToScreen"
import NotFound from "./screens/404"
import AGB from "./screens/TermsAndConditions"
import Imprint from "./screens/Imprint"
import config from "./config";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import "./App.css"
const { BrowserRouter, Switch, Route } = require("react-router-dom")
const fetch = require("node-fetch");

const App = (props) => {
  const [signedIn, setSignedIn] = new useState(false);
  const [user, setUser] = new useState();
  const [templates, setTemplates] = new useState();
  const { enqueueSnackbar } = useSnackbar();

  const addSnackbar = (text, variant) => {
    enqueueSnackbar(text, {
      variant: variant,
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      style: { zIndex: 99 },
      autoHideDuration: 2000
    });
  }

  const itemTemplates =
    [
      {
        id: "dem-it-classic",
        name: "Free",
        img: "https://dem-it.de/uploads/basic_thumbnail.jpg",
        colors: { primary: "#026670", secondary: "#F6F6F6", title: "#FFFFFF", text: "#494949" }
      }
      ,
      {
        id: "dem-it-yellow",
        name: "Solstorm",
        img: "https://dem-it.de/uploads/solstorm_thumbnail.jpg",
        colors: { primary: "#F9B61E", secondary: "#FFFFFF", title: "#FFFFFF", text: "#333333" }
      },
      {
        id: "kuststorm",
        name: "Kuststorm",
        img: "https://dem-it.de/uploads/solstorm_thumbnail.jpg",
        colors: { primary: "#F9B61E", secondary: "#FFFFFF", title: "#FFFFFF", text: "#333333" }
      }
    ]

  if (user) {
    fetch(`${config.HEROKU_SERVER}/userid/${user.uid}`, {
      method: 'post'
    }).then(
      fetch(`${config.HEROKU_SERVER}/userid/${user.uid}`).then(res => res.text()).then(accessibleTemplates => {
        setTemplates(itemTemplates.filter(template => accessibleTemplates.includes(template.id)));
      })
    );
  }

  const theme = createMuiTheme({
    palette: {
      primary: { main: "#263740" },
      secondary: { main: "#F2B255" },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => <LandingPage />} />
          <Route path="/Templates" exact render={() =>
            <TemplatesScreen
              user={user}
            />} />
          <Route path="/FAQ" exact render={() => <FAQScreen />} />
          <Route path="/How-To" exact render={() => <HowToScreen />} />
          <Route path="/Imprint" exact render={() => <Imprint />} />
          <Route path="/TermsAndConditions" exact render={() => <AGB />} />
          <Route path="/Generator" exact render={() => signedIn ?
            <TemplateGenerator
              user={user}
              templates={templates}
              enqueueSnackbar={addSnackbar}
            />
            :
            <LogInPage
              setSignedIn={setSignedIn}
              setUser={setUser}
              enqueueSnackbar={addSnackbar}
            />} />
          <Route path="/template/:id" exact render={(props) => signedIn ?
            <ProductPage {...props} user={user} enqueueSnackbar={addSnackbar} />
            :
            <LogInPage
              setSignedIn={setSignedIn}
              setUser={setUser}
              enqueueSnackbar={addSnackbar}
            />} />
          <Route render={(props) => <NotFound />} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

// export default app;

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  )
}
