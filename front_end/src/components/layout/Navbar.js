import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <div className="container-fluid">
    <ul class="nav navbar-nav">
      <li class="nav-item px-2">
        <Link to="/dashboard">Find Jobs</Link>
      </li>
      <li class="nav-item px-2">
        <Link to="/posts">Company reviews</Link>
      </li>
      <li class="nav-item px-2">
        <Link to="/posts">Find Salaries</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li class="nav-item px-2"><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li class="nav-item px-2"><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
    </div>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h3>
        <Link to="/">
          <i className="fas fa-code" /> Indeed
        </Link>
      </h3>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);