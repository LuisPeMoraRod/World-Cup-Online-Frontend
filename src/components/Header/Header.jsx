import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./Header.scss";

const Header = () => {
    return (
        <Navbar className="navbar navbar-expand-xl navbar-dark header-style container-fluid">
            <Container fluid>
                <div className="align-items-center h3">TI4601 - Project 2</div>
            </Container>
        </Navbar>
    );
};

export default Header;