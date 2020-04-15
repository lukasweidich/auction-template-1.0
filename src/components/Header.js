import React from "react"
const { AppBar, Toolbar, Button, Typography } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Header = props => {
    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <NavLink to="/" style={{ flexGrow: 1 }}>  <img alt="dem-it Logo" style={{ margin: "10px auto 10px auto" }} height={"30px"} src="https://banner2.cleanpng.com/20180606/oir/kisspng-ebay-amazon-com-logo-online-auction-iron-on-5b17d09ade29f4.84563862152828738691.jpg" /></NavLink>
                    <NavLink to="/Generator"><Button variant="contained" color="primary" style={{ margin: "0 1em 0 1em" }} >Auktionsvorlage generieren</Button></NavLink>
                    <NavLink to="/Templates"><Button variant="contained" color="primary" style={{ margin: "0 1em 0 1em" }}>Vorlagen</Button></NavLink>
                    <NavLink to="/How-To"><Button variant="contained" color="primary" style={{ margin: "0 1em 0 1em" }}>How To</Button></NavLink>
                    <NavLink to="/FAQ"><Button variant="contained" color="primary" style={{ margin: "0 1em 0 1em" }} >FAQ</Button></NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;