import React, { useState } from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar"
import PreviewContainer from "./Components/PreviewContainer"
import Texts from "./Constants/Texts"
import Colors from "./Constants/Colors"
import AuthToken from "./Constants/AuthToken"
import URLs from "./Constants/MiscAPI"
const fetch = require('node-fetch');

const app = (props) => {
  let [itemId, setItemId] = new useState();
  let [htmlCode, setHtmlCode] = new useState();

  let onChangeHandler = (event) => {
    setItemId(event.target.value);
  }

  let getItemFromItemId = async (itemId) => {
    console.log(process.env.PROD_APP_ID__CLIENT_ID)
    itemId = "v1|" + itemId + "|0"
    var url = `${URLs.eBayApi}${itemId}`;
    var auth = "Bearer " + AuthToken.access_token;
    let item = await fetch(url, {
      headers: {
        "Authorization": auth
      }
    })
    return item.json();
  }

  let createHtmlFromItem = (item) => {
    return `<p>${item.title}</p>
    <div>
    <b>${item.price.value} ${item.price.currency}</b>
    </div>
    <img width=500 src='${item.image.imageUrl}'/>`
  }

  let onClickHandler = async (itemId) => {
    let item = await getItemFromItemId(itemId);
    setHtmlCode(createHtmlFromItem(item));
  }

  return (
    <div style={{ margin: "24px" }}>
      <SearchBar
        colors={Colors}
        labelText={Texts.itemIdText}
        placeholderText={Texts.itemIdText}
        buttonText={Texts.magnifyingGlass} click={() => onClickHandler(itemId)}
        change={onChangeHandler} />
      <PreviewContainer
        text={htmlCode}
        colors={Colors} />
    </div>
  );
}

export default app;