import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .3,
    meat: 1.2
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    });

    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
}

const removeIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    });
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
}
 
const setIngredients = (state, action) => {
    let ingredients = null;
    if (action.ingredients) {
        ingredients = {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        }
    }
    return updateObject(state,{
        ingredients: ingredients,
        error: false,
        totalPrice: 4,
        building: false 
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);           
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });                           
        default: return state;
    }

};

export default reducer;


