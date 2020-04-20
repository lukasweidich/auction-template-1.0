import React from "react"
import "./Footer.css"
const { AppBar, Toolbar, Button, ButtonGroup } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Footer = props => {
    return (
        <div style={{ padding: "6px 0px 6px 0px", color: "#e6e6e6", backgroundColor: "#263740", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
                <span style={{ margin: "1em", fontSize: ".75em" }}>© 2020 - Auction Template</span>
            </div>
            <div >
                <NavLink exact class="auction-template-footer-link" style={{ fontSize: ".75em", textDecoration: "none", color: "#e6e6e6!important", margin: "1em" }} activeStyle={{ color: "#f2b255!important" }} to="/Imprint">Impressum</NavLink>
                <NavLink exact class="auction-template-footer-link" style={{ fontSize: ".75em", textDecoration: "none", color: "#e6e6e6!important", margin: "1em" }} activeStyle={{ color: "#f2b255!important" }} to="/TermsAndConditions">AGB</NavLink>
            </div >
        </div >
    )
}

export default Footer;