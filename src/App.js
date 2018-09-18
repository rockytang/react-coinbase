import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from './store';
import Dashboard from './containers/Dashboard';

import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Dashboard}/>
        </Router>
      </Provider>
    );
  }
}

export default App;
