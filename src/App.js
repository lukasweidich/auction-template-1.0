import React, { useState } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar"
import PreviewContainer from "./components/PreviewContainer"
import Footer from "./components/Footer"
import Texts from "./constants/Texts"
import Misc from "./constants/Misc"
import Colors from "./constants/Colors"
import AuthToken from "./constants/AuthToken"
import URLs from "./constants/MiscAPI"
import HtmlGenerator from "./util/HtmlGenerator"
import ReactGenerator from "./util/ReactGenerator"
import Content from './components/Content';
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

  let onClickHandler = async (itemId) => {
    let item = await getItemFromItemId(itemId);
    setHtmlCode(HtmlGenerator.createHtmlFromItem(item));
  }

  return (
    <div style={{ margin: "24px" }}>
      <Content>
        <SearchBar
          colors={Colors}
          labelText={Texts.itemIdText}
          placeholderText={Texts.itemIdText}
          buttonText={Texts.magnifyingGlass} click={() => onClickHandler(itemId)}
          change={onChangeHandler} />
        <PreviewContainer
          text={htmlCode}
          colors={Colors} />
      </Content>
      <ReactGenerator item={Misc.testItem} typus={"demIT"} />
      <Footer />
    </div>
  );
}

export default app;