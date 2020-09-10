import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ParallaxProvider } from 'react-scroll-parallax';

import Nav from '../Nav'
import Index from '../main/Index';
import Projects from '../main/Projects';
import AddProject from '../main/AddProject';
import Members from '../main/Members';
import AddMember from '../main/AddMember';

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
            <Route component={Projects} path='/projects'/>
            <Route component={AddProject} path='/addProject'/>
            <Route component={Members} path='/members'/>
            <Route component={AddMember} path='/addMember'/>
          </Switch>
        </ParallaxProvider>
      </div>
    );
  }
}

export default Root;