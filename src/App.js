import React, { useState } from 'react';
import TemplateGenerator from "./screens/TemplateGenerator"
import LogInPage from "./screens/LogInPage"
import LandingPage from "./screens/LandingPage"
import FAQScreen from "./screens/FAQScreen"
import TemplatesScreen from "./screens/TemplatesScreen"
import HowToScreen from "./screens/HowToScreen"
import config from "./config";
const { BrowserRouter, Switch, Route } = require("react-router-dom")
const fetch = require("node-fetch");

const app = (props) => {
  const [signedIn, setSignedIn] = new useState(false);
  const [user, setUser] = new useState();
  const [templates, setTemplates] = new useState();

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

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <LandingPage />} />
        <Route path="/Templates" exact render={() => <TemplatesScreen />} />
        <Route path="/FAQ" exact render={() => <FAQScreen />} />
        <Route path="/How-To" exact render={() => <HowToScreen />} />
        <Route path="/Generator" exact render={() => signedIn ?
          <TemplateGenerator
            user={user}
            templates={templates}
          />
          :
          <LogInPage
            setSignedIn={setSignedIn}
            setUser={setUser}
          />} />
      </Switch>
    </BrowserRouter>
  )
}

export default app;
