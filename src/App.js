import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './pages/home'
import Recipe from './pages/recipe'
// import Timer from './pages/timer'
import './App.css';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <header>
          <Link to="/">Recetas</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route path="/recipe/:recipeID" component={Recipe} />
          {/* <Route path="/timer" component={Timer} /> */}
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
