import * as actionsTypes from '../actions';

const initialState = {
    counter: 0    
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
            break;
        case actionsTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
            break;
        case actionsTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
            break;
        case actionsTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
            break;
    }

    return state;
};

export default reducer;