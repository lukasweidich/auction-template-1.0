import React, { useState } from 'react';
import TemplateGenerator from "./screens/TemplateGenerator"
import LandingPage from "./screens/LandingPage"
const fetch = require("node-fetch");

const app = (props) => {
  const [signedIn, setSignedIn] = new useState(false);
  const [user, setUser] = new useState();
  const [templates, setTemplates] = new useState();

  const [itemTemplates, setItemTemplates] = new useState(
    [
      {
        id: "dem-it-classic",
        name: "dem-IT Classic Template",
        img: "https://dem-it.de/uploads/basic_thumbnail.jpg",
        colors: { primary: "#026670", secondary: "#F6F6F6", title: "#FFFFFF", text: "#494949" }
      }
      ,
      {
        id: "dem-it-yellow",
        name: "dem-IT Yellow Template",
        img: "https://dem-it.de/uploads/solstorm_thumbnail.jpg",
        colors: { primary: "#F9B61E", secondary: "#FFFFFF", title: "#FFFFFF", text: "#333333" }
      }
    ]
  )

  if (user && !templates) {
    fetch(`https://cors-anywhere.herokuapp.com/https://1ffbecf5.ngrok.io/userid/${user.uid}`, {
      method: 'post'
    }).then(
      fetch(`https://cors-anywhere.herokuapp.com/https://1ffbecf5.ngrok.io/userid/${user.uid}`).then(res => res.text()).then(accessibleTemplates => {
        setTemplates(itemTemplates.filter(template => accessibleTemplates.includes(template.id)));
      })
    );
  }

  return (

    signedIn ?

      <TemplateGenerator
        user={user}
        templates={templates}
      />

      :

      <LandingPage
        setSignedIn={setSignedIn}
        setUser={setUser}
      />
  )
}

export default app;