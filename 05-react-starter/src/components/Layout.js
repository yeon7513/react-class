import React from 'react';
import { Link } from 'react-router-dom';

function Layout(props) {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/cleanup">Cleanup</Link>
        <Link to="/todolist">Todolist</Link>
        <Link to="/movie-app">Movies</Link>
      </nav>
    </header>
  );
}

export default Layout;
