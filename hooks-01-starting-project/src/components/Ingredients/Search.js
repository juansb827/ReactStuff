import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import { DB_URL } from '../../const';

const URL = `${DB_URL}/ingredients.json`;
console.log('RSA',URL);
const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { onIngredientsLoaded } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('TERM', enteredFilter );
      if (enteredFilter !== inputRef.current.value) {
        return;
      }
      console.log('QUERIES', enteredFilter );
      const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
      fetch(URL + query)
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
          onIngredientsLoaded(fetchedIngredients);
          console.log('SEARChs');
        });

    }, 500);
    return () => clearTimeout(timer);
  }, [enteredFilter, onIngredientsLoaded]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" ref={inputRef} value={enteredFilter} onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
