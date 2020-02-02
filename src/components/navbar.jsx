import React from "react";
import { Link } from 'react-router-dom'

const NavBar = ({ totalCounters }) => {

  console.log('NavBar - Rendered');

  return (
    <nav className="navbar navbar-light bg-light">
      <Link to="/" className="navbar-brand">
        Cool React App{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </Link>
    </nav>
  );
};

export default NavBar;
