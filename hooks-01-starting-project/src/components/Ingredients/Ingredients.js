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

const httpReducer = (currHttpState, action) => {
  switch(action.type) {
    case 'SEND':
      return { loading: true,  error: null }
    case 'RESPONSE':
      return { loading: false, error: null }
    case 'ERROR':
      return { loading: false, error: action.error.name }
    case 'CLEAR':
      return { loading: false, error: null }
    default:
      throw Error("should not get there");
  }
}

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, [] );  
  //const [ingredients, setIngredients] = useState([]);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });
  //const [isLoading, setIsLoading] = useState(false);
  //  const [error, setError] = useState();
  const ingredientAddedHandler = useCallback(ingredient => {
    dispatchHttp({ type: 'SEND'});
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
        dispatchHttp({ type: 'RESPONSE'})
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', error });
        
      })     

  }, [])

  const onIngredientRemovedHandler = useCallback(id => {
    //dispatchHttp({ type: 'SEND'});
    fetch(URL + `/ingredients/${id}.json?`,
      {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(responseData => {
        dispatch({ type: 'DELETE', id });
        //dispatchHttp({ type: 'RESPONSE'})
      })
      .catch(error => {
        console.log(error)
        //dispatchHttp({ type: 'ERROR', error });
      })      
  }, [])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients});
  }, []);

  const clearError = () => dispatchHttp({ type: 'CLEAR'});

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onIngredientAdded={ingredientAddedHandler} isLoading={httpState.loading}/>

      <section>
        <Search onIngredientsLoaded={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={onIngredientRemovedHandler} />
      </section>

    </div>
  );
}

export default Ingredients;
