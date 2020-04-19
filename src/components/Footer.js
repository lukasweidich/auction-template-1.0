import React from "react"
import "./Links.css"
const { AppBar, Toolbar, Button, ButtonGroup } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Footer = props => {
    return (
        <div style={{ padding: "6px 0px 6px 0px", color: "#e6e6e6", backgroundColor: "#263740", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
                <span style={{ margin: "1em", fontSize: ".75em" }}>© 2020 - Auction Template</span>
            </div>
            <div >
                <NavLink style={{ fontSize: ".75em", textDecoration: "none", margin: "1em" }} to="/Imprint">Impressum</NavLink>
                <NavLink style={{ fontSize: ".75em", textDecoration: "none", margin: "1em" }} to="/TermsAndConditions">AGB</NavLink>
            </div >
        </div >
    )
}

export default Footer;