import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Nav.css';

class Nav extends Component {
  // mount
  componentDidMount() {
    console.log("loaded");
    // declare nav
    this.nav = document.querySelector('nav');

    // add event listener
    window.addEventListener('scroll', this.handleScroll);

    // determine if user is at index
    if (window.location.pathname === '/') {
      this.handleScroll();
    }
  }

  // unmount
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // integrate or remove nav based on scroll position
  handleScroll = () => {
    if (window.pageYOffset !== 0) {
      if (this.nav.classList.contains('integrated')) {
        this.nav.classList.remove('integrated');
      }
    } else if (window.location.pathname === '/') {
      this.nav.classList.add('integrated');
    }
  }

  // remove nav
  removeNav = () => {
    this.nav.classList.remove('integrated');
  }

  // integrate nav
  integrateNav = () => {
    if (!this.nav.classList.contains('integrated') && window.location.pathname !== '/') {
      this.nav.classList.add('integrated');
    }
  }

  // render DOM
  render() {
    return (
      <nav id="nav">
        <Link to="/" onClick={this.integrateNav} id="navLogo">A</Link>
        <Link to="/projects" onClick={this.removeNav} className="navItem">projects</Link>
        <Link to="/members" onClick={this.removeNav} className="navItem">members</Link>
      </nav>
    );
  }
}

export default Nav;