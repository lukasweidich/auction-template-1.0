import React, { useState } from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar"
import PreviewContainer from "./Components/PreviewContainer"
import Texts from "./Constants/Texts"
import Colors from "./Constants/Colors"

const fetch = require('node-fetch');

const app = (props) => {

  let [itemId, setItemId] = new useState();
  let [htmlCode, setHtmlCode] = new useState();

  let onChangeHandler = (event) => {
    setItemId(event.target.value);
  }

  let getItemFromItemId = async (itemId) => {
    var url = `${Texts.eBaySandboxApi}${itemId}`;
    var auth = "Bearer " + "oauth token here :)"
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
    <span>${item.price.value}${item.price.currency}</span>
    </div>
    <img src='${item.image.imageUrl}'/>`
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