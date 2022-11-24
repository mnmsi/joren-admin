import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand to="/news" as={Link}>Joren</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/news">News</Nav.Link>
                        <Nav.Link as={Link} to="/news/create">Add News</Nav.Link>
                        <Nav.Link as={Link} to="/events">Events</Nav.Link>
                        <Nav.Link as={Link} to="/event/create">Add Event</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default Header