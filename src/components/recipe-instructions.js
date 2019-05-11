import React, { Component } from 'react';

class RecipeInstructions extends Component {

  render(){
    const { instructions } = this.props;
    console.log(`instructions ${instructions}`);
    return (
      <div className="instructions">
        <h2>Instructions</h2>

        <div className="steps">
          {
            instructions.map((line, ix) => (
              <div className="step" key={ix}>
                <div className="number">{ix+1}</div>
                <div className="text">{ line }</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default RecipeInstructions;
