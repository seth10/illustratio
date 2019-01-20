import React from 'react'
import { Nav as NavRB, Navbar, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nav = () => (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">illustratio</Link>
            </Navbar.Brand>
        </Navbar.Header>
        <NavRB>
            <NavItem eventKey={1}>
                Home
            </NavItem>
            <NavItem eventKey={2}>
                Random Artwork
            </NavItem>
        </NavRB>
    </Navbar>
)

export default Nav
