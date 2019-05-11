import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { getRecipe} from '../mealdb-api';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';


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
        </div>

        <RecipeIngredients ingredients={ recipe.ingredients } />

        <RecipeInstructions instructions={ recipe.instructions } />
      </div>
    )
  }
}

export default Recipe;
