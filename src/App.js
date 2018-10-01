import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/react-coinbase">
          <Route exact path='/' component={Dashboard} />
        </Router>
      </Provider>
    );
  }
}

export default App;
