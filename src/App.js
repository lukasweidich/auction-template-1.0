import React, { useState } from 'react';
import TemplateGenerator from "./screens/TemplateGenerator"
// import LogInScreen from "./screens/LogInScreen"
import LandingPage from "./screens/LandingPage"

const app = (props) => {

  const [signedIn, setSignedIn] = new useState(false);

  return (

    signedIn ?

      <TemplateGenerator />

      :

      <LandingPage
        setSignedIn={setSignedIn}
      />
  )
}

export default app;