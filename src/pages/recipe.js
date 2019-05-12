import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { getRecipe} from '../mealdb-api';
import RecipeIngredients from '../components/recipe-ingredients';
import RecipeInstructions from '../components/recipe-instructions';


class Recipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipe: null,
      isLoading: true
    }
  }

  async componentDidMount(){
    let recipe = null;
    try {
      recipe = await getRecipe(this.props.match.params.recipeID)
    }
    catch(error){
      recipe = null;
    }

    this.setState({
      recipe,
      isLoading: false
    })
  }

  share = (e) => {
    e.preventDefault(); //cancelar el evento de click
    // PAra detectar si el browser tiene la 'web share api'
    if(!navigator.share){
      alert('Tu navegador no soporta la web share api');
      return;
    }

    // Traer la receta en el estado de la app
    const { recipe } = this.state;
    // llamar a web share api
    navigator.share({ //esto devuelve una promesa
      title: recipe.name,
      text: 'Receta de platzi', //descriptcion del link donde se comenta de que es el contenido
      url: document.location.href
    })
      .then(() => alert('Contenido compartido'))
      .catch((error) => alert('Hubo un error'))
  }

  render(){
    const { recipe, isLoading } = this.state;

    if( isLoading ) {
      return <div className="message">Cargando...</div>
    }
    else if(recipe === null){
      return <div className="message">Hubo un problema :(</div>
    }
    return (
      <div className="Recipe">
        <Helmet>
          <title>{recipe.name}</title>
        </Helmet>

        <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />

        <div className="title">
          <div className="info">
            <h1>{recipe.name}</h1>
            <p>{ recipe.origin }</p>
          </div>
          <div>
            <a onClick={this.share}>Compartir</a>
          </div>
        </div>

        <RecipeIngredients ingredients={ recipe.ingredients } />

        <RecipeInstructions instructions={ recipe.instructions } />
      </div>
    )
  }
}

export default Recipe;
