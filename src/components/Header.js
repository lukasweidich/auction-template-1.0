import React, { useState } from "react"
import "./Links.css"
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import WebIcon from '@material-ui/icons/Web';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

const { ListItem, ListItemIcon, ListItemText, Drawer, Divider, List, AppBar, Toolbar, Button, ButtonGroup, IconButton } = require('@material-ui/core');
const { NavLink } = require("react-router-dom")

const Header = props => {

    const [open, setOpen] = new useState(false);

    const linksDesktop = (
        <div>
            <NavLink exact style={{ fontWeight: "700", textDecoration: "none", color: "#e6e6e6", margin: "0 1em 0 1em" }} activeStyle={{ color: "#f2b255" }} to="/">
                HOME
            </NavLink>
            <NavLink exact style={{ fontWeight: "700", textDecoration: "none", color: "#e6e6e6", margin: "0 1em 0 1em" }} activeStyle={{ color: "#f2b255" }} to="/Generator">
                AUKTIONSVORLAGE GENERIEREN
            </NavLink>
            <NavLink exact style={{ fontWeight: "700", textDecoration: "none", color: "#e6e6e6", margin: "0 1em 0 1em" }} activeStyle={{ color: "#f2b255" }} to="/Templates">
                VORLAGEN
            </NavLink>
            <NavLink exact style={{ fontWeight: "700", textDecoration: "none", color: "#e6e6e6", margin: "0 1em 0 1em" }} activeStyle={{ color: "#f2b255" }} to="/How-To">
                HOW TO
            </NavLink>
            <NavLink exact style={{ fontWeight: "700", textDecoration: "none", color: "#e6e6e6", margin: "0 1em 0 1em" }} activeStyle={{ color: "#f2b255" }} to="/FAQ">
                FAQ
            </NavLink>
            {/* <ButtonGroup variant="text" color="default" aria-label="text primary button group">
                <Button href="/" >Home</Button>
                <Button href="/Generator" >Auktionsvorlage generieren</Button>
                <Button href="/Templates" >Vorlagen</Button>
                <Button href="/How-To">How To</Button>
                <Button href="/FAQ">FAQ</Button>
            </ButtonGroup> */}
        </div>
    )

    const linksMobile = (
        <List
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            <ListItem button component={NavLink} exact activeStyle={{ color: "#f2b255" }} to="/">
                <ListItemIcon><HomeIcon style={{ color: "#263740 " }} /></ListItemIcon>
                <ListItemText primary={"Home"} class="auction-template-hamburger-link" />
            </ListItem>
            <ListItem button component={NavLink} exact activeStyle={{ color: "#f2b255" }} to="/Generator">
                <ListItemIcon><AddToQueueIcon style={{ color: "#263740 " }} /></ListItemIcon>
                <ListItemText primary={"Auktionsvorlage generieren"} class="auction-template-hamburger-link" />
            </ListItem>
            <ListItem button component={NavLink} exact activeStyle={{ color: "#f2b255" }} to="/Templates">
                <ListItemIcon><WebIcon style={{ color: "#263740 " }} /></ListItemIcon>
                <ListItemText primary={"Vorlagen"} class="auction-template-hamburger-link" />
            </ListItem>
            <ListItem button component={NavLink} exact activeStyle={{ color: "#f2b255" }} to="/How-To">
                <ListItemIcon><FormatListNumberedIcon style={{ color: "#263740 " }} /></ListItemIcon>
                <ListItemText primary={"How To"} class="auction-template-hamburger-link" />
            </ListItem>
            <ListItem button component={NavLink} exact activeStyle={{ color: "#f2b255" }} to="/FAQ">
                <ListItemIcon><QuestionAnswerIcon style={{ color: "#263740 " }} /></ListItemIcon>
                <ListItemText primary={"FAQ"} class="auction-template-hamburger-link" />
            </ListItem>
        </List >
    )

    return (
        <div style={{ flexGrow: 1 }}>
            <AppBar id="auction-template-navbar-desktop" position="fixed">
                <Toolbar>
                    <NavLink to="/" style={{ flexGrow: 1 }}>  <img alt="dem-it Logo" style={{ margin: "10px auto 10px auto" }} height={"40px"} src="https://dem-it.de/auction-template/auction-template-logo.png" /></NavLink>
                    {linksDesktop}
                </Toolbar >
            </AppBar >

            <AppBar id="auction-template-navbar-mobile" position="fixed">
                <Toolbar id="auction-template-navbar-mobile">
                    <NavLink to="/" style={{ flexGrow: 1 }}>  <img alt="dem-it Logo" style={{ margin: "10px auto 10px auto" }} height={"40px"} src="https://dem-it.de/auction-template/auction-template-logo.png" /></NavLink>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={() => setOpen(!open)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar >
                <Drawer
                    anchor="right"
                    open={open}
                    style={{
                        flexShrink: 0
                    }}
                    onClose={() => setOpen(false)}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: "#e6e6e6"
                    }}>
                        <IconButton onClick={() => setOpen(!open)}>
                            <ChevronRightIcon style={{ color: "#263740 " }} />
                        </IconButton>
                    </div>
                    <div class="auction-template-navbar-mobile-drawer-content" style={{
                        backgroundColor: "#e6e6e6",
                        height: "100vh",
                        color: "#263740"
                    }}>
                        <Divider />
                        {linksMobile}
                    </div>
                </Drawer>
            </AppBar >
        </div >
    )
}

export default Header;
