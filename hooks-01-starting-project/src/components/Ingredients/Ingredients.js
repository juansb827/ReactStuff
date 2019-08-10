import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import  ErrorModal from '../UI/ErrorModal';
const URL = 'https://react-hooks-sample-81c20.firebaseio.caom';
function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
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
        setIngredients(prevIngredients => [...prevIngredients, {
          ...ingredient,
          id: responseData.name
        }]);
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
        setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
      })
      .finally(() => setIsLoading(false));
    
  }

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
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
