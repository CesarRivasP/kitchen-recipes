import React, { Component } from 'react';

class RecipeInstructions extends Component {
  render(){
    const { ingredients } = this.props;
    console.log(`ingredients`);
    console.log(ingredients);
    return (
      <div className="ingredients">
        <h2>Ingredients</h2>
        <ul>
          {
            ingredients.map((i, ix) => (
              <li key={ix}>{ i.ingredient }: { i.measure }</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default RecipeInstructions;
