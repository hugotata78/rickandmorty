import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom'
import Routes from './Routes';
import { connect } from 'react-redux'

function App({ loggedIn }) {
  return (
    <div>
      <div className="nav-bar">
        <NavLink className="link" activeClassName="active" exact to="/">
          Inicio
        </NavLink>
        <NavLink className="link" activeClassName="active" to="/favs">
          Favoritos
        </NavLink>
        <NavLink className="link" activeClassName="active" to="/login">
          {!loggedIn ? 'Login': 'Logout'}
        </NavLink>
      </div>
      <Routes />
    </div>
  );
}

function mapStateToProps({ users: { loggedIn } }) {
  return {
    loggedIn,
  };
}
export default connect(mapStateToProps)(App);
