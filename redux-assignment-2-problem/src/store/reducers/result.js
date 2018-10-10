import * as actionsTypes from '../actions';

const initialState = {    
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {       
        case actionsTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }            
        case actionsTypes.DELETE_RESULT:
            /*const id = 2;
            const newArray = [...state.results];
            newArray.splice(id, 1); */
            const updatedArray = state.results.filter(el => el.id !== action.resultId );
            return {
                ...state,
                results: updatedArray
            }


    }

    return state;
};

export default reducer;