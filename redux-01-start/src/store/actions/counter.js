import * as actionTypes from './actionTypes';

export const increment = () => {
    return {
      type: actionTypes.INCREMENT   
    };
}

export const decrement = () => {
    return {
      type: actionTypes.DECREMENT   
    };
}

export const add = (amount) => {
    return {
      type: actionTypes.ADD ,
      value: amount   
    };
}

export const subtract = (amount) => {
    return {
      type: actionTypes.SUBTRACT ,
      value: amount   
    };
}