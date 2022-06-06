import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows


//import logo from "logo.svg";
import logoTT from "./logoTT.png";
import logoTTinfo from "./logoTT_info.png";

var ps;

export function Sidebar(props) {
  // verifies if routeName is the one active (in browser input)



  const sidebar = useRef();

  //intentando cerrar el sidebar

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <div className="simple-text logo-normal">
        {/*} TTHubs*/}
           <img src={logoTTinfo} alt="react-logo" />
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <li>
            <NavLink
              to="/statistics"
              className="nav-link"
              activeClassName="active"
            >
              Statistics
              <i className="nc-icon nc-sound-wave" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/foodtable"
              className="nav-link"
              activeClassName="active"
              aria-current="page"
            >
              Food Table
              <i className="nc-icon nc-tile-56" />
            </NavLink>
          </li>
          );
        </Nav>
      </div>
    </div>
  );
}
