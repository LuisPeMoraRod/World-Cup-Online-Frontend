import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "./SideNavBar.scss";

const blue = "#093697";
const white = "#fff";

const SideNavBar = () => {

  return (
    <div className="div-navbar">
      <CDBSidebar backgroundColor={blue} textColor={white} toggled={false}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <h4 className="text-decoration-none navbar-menu">Menu</h4>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <div title="Torneos">
              <NavLink exact to="/tournaments" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-trophy" className="navbar-item">
                  Torneos
                </CDBSidebarMenuItem>
              </NavLink>
            </div>


          </CDBSidebarMenu>
        </CDBSidebarContent>

      </CDBSidebar>
    </div>
  );
};

export default SideNavBar;
