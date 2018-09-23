import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            const ingredientAmount = props.ingredients[igKey];
            const ingredients = [...Array(ingredientAmount)];
            ingredients.map((_, i) => {
                ingredients.push(<BurgerIngredient key={igKey + i} type={igKey} />);
            });            
            return ingredients;            
        });

    return (
        <div className={classes.burger} >
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;