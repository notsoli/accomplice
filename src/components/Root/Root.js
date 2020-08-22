import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ParallaxProvider } from 'react-scroll-parallax';

import Nav from '../Nav'
import Index from '../main/Index';
import Members from '../main/Members';
import Projects from '../main/Projects';

import './Reset.css';
import './Root.css';

class Root extends Component {
  render() {
    return (
      <div>
        <ParallaxProvider>
          <Nav />
          <Switch>
            <Route component={Index} exact path='/'/>
            <Route component={Members} path='/members'/>
            <Route component={Projects} path='/projects'/>
          </Switch>
        </ParallaxProvider>
      </div>
    );
  }
}

export default Root;