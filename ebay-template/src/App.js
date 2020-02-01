import React, { useState } from 'react';
import './App.css';
import SearchBar from "./Components/SearchBar"
import PreviewContainer from "./Components/PreviewContainer"
import Texts from "./Constants/Texts"
import Misc from "./Constants/Misc"
import Colors from "./Constants/Colors"

const app = (props) => {

  let [articelId, setArticleId] = new useState();
  let [htmlCode, setHtmlCode] = new useState();

  let onChangeHandler = (event) => {
    setArticleId(event.target.value);
  }

  let onClickHandler = (articelId) => {
    setHtmlCode("<h1>Das ist ein Test</h1><h2>h2test</h2><img style='max-height: 100px; max-width: 100px;'src='https://i.ebayimg.com/images/g/JGIAAOSwgPReGHy0/s-l1600.jpg'/>");
    if (Misc.articleIdRegEx.test(articelId)) {
      // window.open(Texts.ebayDeURL + articelId, "_blank");
    } else {
      // alert(Texts.articleIdIsNotANumber)
    }
  }

  return (
    <div style={{ margin: "2%" }}>
      <SearchBar
        colors={Colors}
        labelText={Texts.articleNumber}
        placeholderText={Texts.articleNumber}
        buttonText={Texts.search} click={() => onClickHandler(articelId)}
        change={onChangeHandler} />
      <PreviewContainer
        text={htmlCode}
        colors={Colors} />
    </div>
  );
}

export default app;