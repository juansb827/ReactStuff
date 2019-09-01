import React, { useState, useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import  ErrorModal from '../UI/ErrorModal';
import { DB_URL } from '../../const';

const URL = `${DB_URL}`;

const ingredientsReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);      
    default:
      throw Error("should not get there");
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, [] );
  //const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const ingredientAddedHandler = ingredient => {
    setIsLoading(true);
    fetch(URL + '/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: 'ADD', ingredient: {
          ...ingredient,
          id: responseData.name
        }});
      })
      .catch(error => {
        setError(error.name);
      })
      .finally(() => setIsLoading(false));

  }

  const onIngredientRemovedHandler = id => {
    setIsLoading(true);
    fetch(URL + `/ingredients/${id}.json?`,
      {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: 'DELETE', id });
      })
      .catch(error => {
        console.log(error)
        setError(error.name);
      })
      .finally(() => setIsLoading(false));
    
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients});
  }, []);

  const clearError = () => setError(null );

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onIngredientAdded={ingredientAddedHandler} isLoading={isLoading}/>

      <section>
        <Search onIngredientsLoaded={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={onIngredientRemovedHandler} />
      </section>

    </div>
  );
}

export default Ingredients;
