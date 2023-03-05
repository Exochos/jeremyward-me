import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css';

function NavBar() {
  return (
    <div className="navContainer">
      <nav className="nav">
        <div className="navItem">
          <NavLink to="/" exact activeClassName="active-tab">
            Home Page
          </NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/dog-fact" activeClassName="active-tab">
            Dog Fact
          </NavLink>
        </div>
        <div className="navItem">
          <NavLink to="/airbnb" activeClassName="active-tab">
            Airbnb
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
