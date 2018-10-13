import * as actionsTypes from '../actions/actionTypes';
import { updateObject } from '../utility'
const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(el => el.id !== action.resultId);
    return updateObject(state, { results: updatedArray });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.STORE_RESULT:
            return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.result }) });
        case actionsTypes.DELETE_RESULT:
            return updateObject(state, action);
    }

    return state;
};

export default reducer;