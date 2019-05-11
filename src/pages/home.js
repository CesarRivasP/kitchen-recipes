import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
// import mealdb from '../mealdb-api'; before
import { getLatest } from '../mealdb-api'; //afer

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: null,
      isLoading: true
    }
  }

  async componentDidMount(){
    let recipes;
    try {
      recipes = await getLatest();
      console.log('recipes');
      console.log(recipes);
    }
    catch(error){
      console.log(error);
      recipes = null;
    }

    this.setState({
      recipes,
      isLoading: false
    })
  }


  render(){
    const { recipes, isLoading } = this.state;

    if(isLoading){
      return <div className="message">Cargando...</div>
    }

    return (
      <div>
        <Helmet>
          <title>Recetas</title>
        </Helmet>
        <div className="recipes">
          {
            recipes && recipes.map((recipe) => (
              <Link to={`/recipe/${recipe.id}`} className="recipe" key={recipe.id}>
                <span className="bg" style={{backgroundImage: `url(${recipe.thumbnail})`}}></span>
                <span className="info">
                  <h2>{ recipe.name }</h2>
                </span>
              </Link>
            ))
          }
        </div>
      </div>
    )
  }

}

export default Home;
