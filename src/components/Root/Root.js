import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from '../main/Index';
import Members from '../main/Members';
import Projects from '../main/Projects';

import './Reset.css';

class Root extends Component {
  render() {
    return (
      <div>
        <p>Root component</p>
        <Switch>
          <Route component = {Index} exact path = '/'/>
          <Route component = {Members} path = '/members'/>
          <Route component = {Projects} path = '/projects'/>
        </Switch>
      </div>
    );
  }
}

export default Root;