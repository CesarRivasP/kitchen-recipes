import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import ReactGA from 'react-ga'
import { createBrowserHistory } from 'history'
import Home from './pages/home'
import Recipe from './pages/recipe'
import Timer from './pages/timer'
import IfOffLine from './components/if-offline'
import './App.css';

// Creacion del plugin para la historia del browser
const history = createBrowserHistory(); //esto nos permite trackear que paginas visitan los usuarios

//inicializar ReactGA
ReactGA.initialize('UA-000000-01'); //id fake
// Trackear la pageview inicial cuando entramos en la aplicacion
ReactGA.pageview(window.location.pathname + window.location.search)

// hay que agregar este evento para que indique cuando un usuario cambia de pagina. COn esto se puede trackear una page view con react
history.listen(function(location){
  ReactGA.pageview(window.location.pathname + window.location.search) //url completa que esta visitando el usuario
  // pathname es la url en si
  // search son todos los querys que tenemos dentro de la url
})

class App extends Component {
  render(){
    return (
      <Router history={history}>
        <div>  
          <header>
            <Link to="/">Recetas <IfOffLine>Offline</IfOffLine></Link>
            <Link to="/timer" className="timerLink">⏱</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeID" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
