import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" style={{ paddingTop: 1 }} to="/">
        Movies
      </Link>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
