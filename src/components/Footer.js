import React from "react"
import { NavLink } from "react-router-dom"
import { Small, Flex } from "react-landing-page"

const Footer = props => {
    return (
        <Flex is="footer" alignItems="center" p={3}>
            <NavLink to="/help">Hilfe</NavLink>
            <Small color="grey" ml="auto">© <a href="https://www.dem-it.de">demIT</a>, 2020</Small>
        </Flex>
    )
}

export default Footer;