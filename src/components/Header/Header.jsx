import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./Header.scss";
import logo from "../../assets/fifa-logo.png"

const Header = () => {
    return (
        <Navbar className="navbar navbar-expand-xl navbar-dark header-style container-fluid">
            <Container fluid>
                <a className="navbar-brand" href="#">
                    <img
                        className="d-inline-block align-text-top me-2"
                        height="50"
                        src={logo}
                        alt="FIFA"
                    />
                </a>
            </Container>
        </Navbar>
    );
};

export default Header;