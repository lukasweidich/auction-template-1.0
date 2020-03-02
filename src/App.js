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
var request = require("request");

const app = (props) => {
  let [itemId, setItemId] = new useState();
  let [htmlCode, setHtmlCode] = new useState();

  let onChangeHandler = (event) => {
    setItemId(event.target.value);
  }

  let getAuthToken = () => {
    var buffer = new Buffer(process.env.PROD_APP_ID__CLIENT_ID + ":" + process.env.PROD_CERT_ID__CLIENT_SECRET);
    var id_secret_b64 = buffer.toString('base64');

    var options = {
        method: 'POST',
        url: "https://api.ebay.com/identity/v1/oauth2/token",
        headers:
        {
            Authorization: "Basic " + id_secret_b64,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:
        {
            grant_type: 'client_credentials',
            scope: 'https://api.ebay.com/oauth/api_scope'
        }
    };
    console.log("here1")
    let a = request(options, function (error, response, body) {
        //if (error) {
          //throw new Error(error);
        //}else{
          //console.log("in request: " + body.access_token)
        //return body.access_token;
      //}
      console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  return response;
      });
      return a;
}

  let getItemFromItemId = async (itemId) => {
    itemId = "v1|" + itemId + "|0"
    var url = `${URLs.eBayApi}${itemId}`;
    var auth = "Bearer " + "v^1.1#i^1#f^0#p^1#I^3#r^0#t^H4sIAAAAAAAAAOVYXWwUVRTudLs1UNBEDWAjsg4gCszsndm/mbG7ydIWWNrtlm4ptYJwd+bOdtrdmWHmDu0mGksRLCS8CFFAlBqJP0QT0PggRgzqi/FBsRoSItGECKhR/IsYXnBmu5RtJS3SDTZxXzZz7rnnfuf7zrn3zoC+ymmLt6/cfmkmcVv5YB/oKycIpgpMq3Qvud1VXu0uA0UOxGDfgr6KfteFGhNmM7rQgkxdU03k6c1mVFPIG8OkZaiCBk3FFFSYRaaARSEZjTcKLA0E3dCwJmoZ0hOrC5MpLgj8QUaSUyGWC4icbVWvxmzVwiQf5NlgICCKgOGlFJLtcdO0UEw1MVRxmGQBCyjgowDbygQFPyP4AB0CTAfpaUOGqWiq7UIDMpKHK+TnGkVYx4cKTRMZ2A5CRmLR5clENFZX39Ra4y2KFSnwkMQQW+bop1pNQp42mLHQ+MuYeW8haYkiMk3SGxleYXRQIXoVzE3Az1PNBliOZSWG9fNMKMWBklC5XDOyEI+Pw7EoEiXnXQWkYgXnJmLUZiPVhURceGqyQ8TqPM7fagtmFFlBRpisXxZ9JNrcTEYarW5orkUK1YqyegZiRDW31FGyCEMSzyGJSkHEQi7EFxYajlagecxKtZoqKQ5ppqdJw8uQjRqN5cZXxI3tlFATRlTGDqJiP67AYZAPdTiiDqto4U7V0RVlbSI8+ceJFRiZjbGhpCyMRiKMHchTFCahrisSOXYwX4uF8uk1w2Qnxrrg9fb09NA9Ploz0l4WAMbbHm9Mip0oC0nb1+n1YX9l4gmUkk9FRPZMUxFwTrex9Nq1agNQ02TED2wyuALvo2FFxlr/YSjK2Tu6I0rVIYhloY/loAghCgUZWIoOiRSK1OvgQCmYo7LQ6EbYLlMRUaJdZ1YWGYok+AIy6+NkRElBXqb8vCxTqYAUpBgZIYBQKiXy3P+pUW601JNINBAuSa2XrM5lLcGsBbocb+jgl2mb2i0xHuxKr+5cku7OrcopIehf0dKwalOoxZ8O32g3XD95UdNRs5ZRxFwJGHB6vYQs+AypGRo4l0SZjG2YVKKmk+jUEtmZb9oBoK7QTmPTopb1atDe0R3ThjziSeUc1fVYNmthmMqgWGl28/9oJ79ueop915lSOdn6DQupSMOXFDqvJm1uFmkDmZpl2PczOuGc2a1aN1LtHRAbWiaDjDZm0kLfan2dXp+Aj395WNxc7qW7qUyl2hYzil1CG6ZaZrdEUQVOsdOYCXA+JhhieTCpvGrzmrbmpto5tFIzMZLGS61ixU1eq72jX/IjZfkf00+8A/qJo+UEAbxgITMf3F/pWlPhmlFtKhjRCpRpU0mr9rurgehulNOhYpRXEvoa+MPCos8Kg+vBnJEPC9NcTFXRVwZw77URN3PH7Jk2JT7AMkE/4wMdYP610QpmVsXdj7kG9/a+e2ipol/ZmThQcxkf9+wHM0ecCMJdVtFPlO2r9J0f+KJpVufqP3YlTmW/Cl3+68xn6+rbt158uf+N6nPHTv7JPsOe3PU7P5RofmBueu7xY698GXBTRzf/+hbfMK/qg3jNswNbdmwt4977RWQ/Ltfe3KC75qf7pp8bOnSichE99JL7Q0QcOVzfUvZU9s49J2tPh3a4j1obNxmxRwOunw6sP9Pw0O4F390Vci2dfepsnK59/eHDT7794Nc/vnhhD3+pC105sTimNT63bx51Zt3jp6ti+PvdHV1Dr7o+bV+14/g9RNMnR55YMv1AclvmbPxgpHabzsywGhMfVQ8k2bqDc+L73/e7tb0X1acH7gunlz+/5fTPlza+9vki/zfnY/t/e+HbtpiybVi+vwH/MSYT8BEAAA==";
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
      <ReactGenerator item={Misc.testItem} typus={"test"} />
      <Footer />
    </div>
  );
}

export default app;