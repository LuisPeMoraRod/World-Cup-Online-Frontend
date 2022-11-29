import React from "react";
import Header from "../Header/Header";
import SideNavBar from "../SideNavBar/SideNavBar";
import "./Layout.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Layout = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Header className="app-header" />
      </div>
      <div className="row no-gutters">
        <div className="col-2">
          {" "}
          <SideNavBar />
        </div>
        <div className="col-9">
          <main id="main_section">{props.children}</main>
        </div>
      </div>
      
    </div>
  );
};

export default Layout;
