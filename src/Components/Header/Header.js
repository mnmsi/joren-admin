import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";
const Header = () => {
    const navigate = useNavigate()
    let isAuth = localStorage.getItem("joren_token") ?? null;
    const handleLogout = () => {
        const config = {
            headers: { Authorization: `Bearer ${isAuth}` }
        };
        axios.get(process.env.REACT_APP_API_URL + "/api/admin/logout",config).then(res => {
            if (res.data.status){
                localStorage.removeItem("joren_token");
                navigate("/login");
                window.location.reload();
            }
        })


    }
  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand to="/" as={Link}>Joren</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {isAuth && <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/news">News</Nav.Link>
                        <Nav.Link as={Link} to="/news/create">Add News</Nav.Link>
                        <Nav.Link as={Link} to="/events">Events</Nav.Link>
                        <Nav.Link as={Link} to="/event/create">Add Event</Nav.Link>
                    </Nav>
                    <button onClick={handleLogout} type={`button`} className={`btn btn-danger`}>Logout</button>
                </Navbar.Collapse> }
            </Container>
        </Navbar>
    </>
  )
}

export default Header