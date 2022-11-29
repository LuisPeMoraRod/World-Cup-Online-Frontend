import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
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
              <NavLink exact="true" to="/tournaments">
                <CDBSidebarMenuItem
                  icon="fa-solid fa-trophy"
                  className="navbar-item"
                >
                  Torneos
                </CDBSidebarMenuItem>
              </NavLink>
            </div>
            <div title="Estadísticas">
              <NavLink exact="true" to="/rankings">
                <CDBSidebarMenuItem
                  icon="fa-solid fa-chart-bar"
                  className="navbar-item"
                >
                  Estadísticas
                </CDBSidebarMenuItem>
              </NavLink>
            </div>
            <div title="LigasPrivadas">
              <NavLink exact="true" to="/privateLeagues">
                <CDBSidebarMenuItem
                  icon="fa-solid fa-users"
                  className="navbar-item"
                >
                  Ligas Privadas
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
