import 'isomorphic-fetch';

const baseURL = 'https://www.themealdb.com/api/json/v1/1';


export const getLatest = async() => {
  const request = await fetch(`${baseURL}/latest.php`);
  const data = await request.json();
  const recipes = data.meals.map((meal) => normalizeMeal(meal));

  return recipes;
}

export const getRecipe = async(recipeID) => {
  const request = await fetch(`${baseURL}/lookup.php?i=${recipeID}`);
  const data = await request.json();
  if(!data.meals) return null;
  const recipe = normalizeMeal(data.meals.shift());

  return recipe;
}

const normalizeMeal = (meal) => {
  const newMeal = {};

  newMeal.id = meal.idMeal;
  newMeal.name = meal.strMeal;
  newMeal.category = meal.strCategory;
  newMeal.origin = meal.strArea;
  newMeal.instructions = meal.strInstructions.split('\n').filter((i) => i.trim() !== '');
  newMeal.thumbnail = meal.strMealThumb;
  newMeal.tags = meal.strTags ? meal.strTags.split(',') : [];
  newMeal.youtube = meal.strYoutube;
  newMeal.ingredients = [];
  newMeal.url = meal.strSource;
  newMeal.dateModified = meal.dateModified;

  for( let i = 1; i <= 20; i++) {
   if( meal[`strIngredient${i}`] !== '' && meal[`strMeasure${i}`] !== '' ) {
     newMeal.ingredients.push({
       ingredient: meal[`strIngredient${i}`],
       measure: meal[`strMeasure${i}`]
     })
   }
 }

 return newMeal
}
