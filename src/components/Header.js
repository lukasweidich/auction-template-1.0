import React from "react"
import "./Links.css"

const { AppBar, Toolbar, Button, ButtonGroup } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Header = props => {
    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <NavLink to="/" style={{ flexGrow: 1 }}>  <img alt="dem-it Logo" style={{ margin: "10px auto 10px auto" }} height={"40px"} src="https://dem-it.de/auction-template/auction-template-logo.png" /></NavLink>
                    <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                        <Button href="/" >Home</Button>
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