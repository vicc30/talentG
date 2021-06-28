import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import MainContainer from './MainContainer/MainContainer';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function UnderConstruction() {
  return (
    <div className="myProfile">
      <h1 className="myProfile__title">Talent G</h1>
      <p className="myProfile__subtitle">Under Construction</p>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route path='/myProfile' component={UnderConstruction} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
