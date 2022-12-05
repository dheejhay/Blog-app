import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <header>
      <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={'/blog/posts'}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to={'/blog/posts/add'}>Add Post</Link>
            </li>
            <li className="nav-item">
            <Link to={'/blog/users/signup'}>Signup</Link>
          </li>
          <li className="nav-item">
          <Link to={'/blog/users/login'}>Login</Link>
        </li>
        <li className="nav-item">
        <Link to={'/users/profile'}>Profile</Link>
      </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
    );
}

export default Navbar;