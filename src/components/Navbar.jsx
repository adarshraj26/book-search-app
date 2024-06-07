import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Search Books</Link></li>
      <li><Link to="/bookshelf">My Bookshelf</Link></li>
    </ul>
  </nav>
);

export default Navbar;
