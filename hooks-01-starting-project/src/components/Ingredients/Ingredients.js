import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
const URL = 'https://react-hooks-sample-999999.firebaseio.com/ingredients.json';
function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    fetch(URL)
    .then(response => response.json())
    .then(responseData => {
      const fetchedIngredients = [];
      for (const key in responseData) {
        fetchedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }
      setIngredients(fetchedIngredients); 
    }); 
  }, []);

  const ingredientAddedHandler = ingredient => {
    fetch(URL,
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(responseData => {
          setIngredients(prevIngredients => [...prevIngredients, {
            ...ingredient,
            id:  responseData.name
          }]);
        })

  }

  const onIngredientRemovedHandler = id => {
    setIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== id));
  }


  return (
    <div className="App">
      <IngredientForm onIngredientAdded={ingredientAddedHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={onIngredientRemovedHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
