import React from "react"
import "./Links.css"
const { AppBar, Toolbar, Button, ButtonGroup } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Footer = props => {
    return (
        <div style={{ padding: "6px 0px 6px 0px", color: "#E7EFF6", backgroundColor: "#263740", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div>
                <span style={{ margin: "10px" }}>© 2020 - Auction Template</span>
            </div>
            <div >
                <NavLink style={{ textDecoration: "none", margin: "10px" }} to="/Imprint">Impressum</NavLink>
                <NavLink style={{ textDecoration: "none", margin: "10px" }} to="/TermsAndConditions">AGB</NavLink>
            </div>
        </div >
    )
}

export default Footer;