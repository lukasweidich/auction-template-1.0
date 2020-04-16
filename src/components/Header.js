import React from "react"
const { AppBar, Toolbar, Button, ButtonGroup } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Header = props => {
    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <NavLink to="/" style={{ flexGrow: 1 }}>  <img alt="dem-it Logo" style={{ margin: "10px auto 10px auto" }} height={"30px"} src="https://banner2.cleanpng.com/20180606/oir/kisspng-ebay-amazon-com-logo-online-auction-iron-on-5b17d09ade29f4.84563862152828738691.jpg" /></NavLink>
                    <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                        <Button href="/Generator" >Auktionsvorlage generieren</Button>
                        <Button href="/Templates" >Vorlagen</Button>
                        <Button href="/How-To">How To</Button>
                        <Button href="/FAQ">FAQ</Button>
                    </ButtonGroup>
                </Toolbar >
            </AppBar >
        </div >
    )
}

export default Header;